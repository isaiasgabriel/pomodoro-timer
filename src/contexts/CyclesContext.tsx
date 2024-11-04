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

import { createContext, ReactNode, useReducer, useState } from 'react'
import { cyclesReducer, Cycle } from '../reducers/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  markCurrentCycleIdAsNullAction,
} from '../reducers/actions'

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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  // IMPORTANT: Don't forget to set the initial values of our reducer, which is an object that'll have our states

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Now, we can destructure both cycles and activeCycleId from our state object returned from the reducer
  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
