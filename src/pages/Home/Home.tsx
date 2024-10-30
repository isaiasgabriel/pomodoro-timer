import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './Home.styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './Components/NewCycleForm/NewCycleForm'
import { Countdown } from './Components/Countdown/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

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
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

// 1. Create the context
export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Type your task'),
  minutes: zod
    .number()
    .min(5, 'Minutes should be between 5 and 60')
    .max(60, 'Minutes should be between 5 and 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

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
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
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
