import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './Home.styles'
import { createContext, useEffect, useState } from 'react'
import { NewCycleForm } from './Components/NewCycleForm/NewCycleForm'
import { Countdown } from './Components/Countdown/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// 2. Create the context interface
interface CyclesContextType {
  // Add the variables and states that you want to be shared across components
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  markCurrentCycleIdAsNull: () => void
}

// 1. Create the context
export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // Instead of passing the 'setCycles' and 'setActiveCycleId' functions directly through context,
  // we created dedicated functions (e.g., markCurrentCycleAsFinished and markCurrentCycleIdAsNull) to update state.
  // This approach simplifies the interface by avoiding the complex types of React's 'set' functions,

  function markCurrentCycleIdAsNull() {
    setActiveCycleId(null)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutes,
      startDate: new Date(),
    }

    setCycles((array) => [...array, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterrupCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const task = watch('task') // Gets the current value of the 'task' input
  const isSubmitDisabled = !task // Disable the submit button if the task input is empty

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* 3. Wrap the components that'll use those context inside the Context.provider */}
        <CyclesContext.Provider
          // 4. Add the values inside the value props
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            markCurrentCycleIdAsNull,
          }}
        >
          <NewCycleForm />
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterrupCycle} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
