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

interface CreateCycleData {
  task: string
  minutes: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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
  // useReducer receives 2 arguments:
  // 1. A reducer function
  // 2. An initial state
  //
  // Usage example:
  // const [state, dispatch] = useReducer(() => {}, []);
  //
  // 1. Reducer function: (state: stateType, action: any) => {}
  // 2. Initial state: []
  //
  // When dispatch() is called, it triggers the reducer function. The `action` parameter
  // contains the arguments passed to `dispatch`. Unlike useState, we don't modify the
  // state directly with a setState function; instead, all state-related logic is handled
  // within the reducer.
  //
  // In summary: whenever dispatch is called, it runs the reducer function, with `action`
  // providing the necessary data for state modifications.

  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycle,
      },
    })
  }

  function markCurrentCycleIdAsNull() {
    setActiveCycleId(null)
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
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    // We pass an object to dispatch. The "type" property specifies which action
    // to perform, and "payload" contains the data needed for that action.
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
    setActiveCycleId(null)
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
