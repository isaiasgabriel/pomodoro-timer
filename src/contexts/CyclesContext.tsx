// Step-by-step to create a context across routes:
// 1. Create your context file (CyclesContext.tsx).
// 2. Define the types for your context (CyclesContextType).
// 3. Create the context itself and export it (export const CyclesContext = createContext({} as CyclesContextType)).
// 4. Create a component to wrap your router and provide the Context across the router (CyclesContextProvider).
// 5. Receive {children} as a property in the CyclesContextProvider component.
// 6. Declare all your context values and functions.
// 7. Return <CyclesContext.Provider /> with all the values from CyclesContextType, and wrap the children inside it:
//
// <CyclesContext.Provider
//   value={{
//     cycles,
//     activeCycle,
//     ...
//   }}
// >
//   {/* IMPORTANT: Don't forget to include the children (i.e., <Router /> component) */}
//   {children}
// </CyclesContext.Provider>
//
// 8. Wrap your router in 'App.tsx' with the 'CyclesContextProvider' component:
//
// <CyclesContextProvider>
//   <Router />
// </CyclesContextProvider>
//
// This allows any file/component inside the Router to access these states/variables/functions via the Context API.
//
// Example:
// const { activeCycle } = useContext(CyclesContext)
//

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { cyclesReducer, Cycle } from '../reducers/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  markCurrentCycleIdAsNullAction,
} from '../reducers/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutes: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  markCurrentCycleIdAsNull: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  // IMPORTANT: if you don't add the children below it won't work
  // The children has a type of React Node wich means any valid HTML component, which includes <Components />, divs, plain text, etc...
  // In this case, the children is the <Router />
  children,
}: CyclesContextProviderProps) {
  // Previoulsy, the Reducer returned only the cycles array, now we changed the architecture in a way that we return an object with 2 values:
  // 1. Cycle[] array;
  // 2. activeCycleId,
  // This allows one reducer to manage both states, so we no longer need a separate set function to to update activeCycleId.
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      // If there's no cyclesState in the localStorage it'll return the initial state above previously declared
      return initialState
    },
  )
  // The third argument in useReducer is an initializer function, executed during the initial render.
  // Here, it checks for a saved state in localStorage.
  // If a stored state is found, it parses and returns it, initializing cyclesState.
  // Otherwise, it returns the default initial state.
  // IMPORTANT: Don't forget to set the initial values of our reducer, which is an object that'll have our states

  // Moved these states up so we can access to define the amountSecondsPassed state below
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // We'll check if there's an active cycle to define the amountSecondsPassed
    // This way, whenever we reload the page it comes back with the correct time
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    // Otherwise, if there's no activeCycle it'll return 0
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])
  // This useEffect runs whenever cyclesState changes.
  // It serializes the updated cyclesState and saves it to localStorage.
  // This ensures the application's state is preserved across page reloads.
  // On reload, the initializer function retrieves and restores the saved state.

  // Now, we can destructure both cycles and activeCycleId from our state object returned from the reducer

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function markCurrentCycleIdAsNull() {
    dispatch(markCurrentCycleIdAsNullAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutes,
      startDate: new Date(),
    }

    // setCycles((array) => [...array, newCycle])
    dispatch(addNewCycleAction(newCycle))
    // We pass an object to dispatch. The "type" property specifies which action
    // to perform, and "payload" contains the data needed for that action.
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        markCurrentCycleIdAsNull,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {/* IMPORTANT: don't forget to add the children (i.e. <Router /> component) */}
      {children}
    </CyclesContext.Provider>
  )
}
