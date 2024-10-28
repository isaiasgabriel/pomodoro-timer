import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  TaskInput,
  MinutesInput,
  StartCountdownButton,
  StopCountdownButton,
} from './Home.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

// Controlled components - we store the user's input in React state, which allows us to monitor and update the component in real-time.
// Pros: More dynamic; we get real-time updates as the user interacts with the component.
// Cons: Each state change triggers a re-render, which in some cases can affect performance if the component is complex or the updates are frequent.

// In this case, we monitor the TaskInput. When the user fills in the input, we enable the start button.

// React hook form - a library that helps manage forms.
// 1. npm i react-hook-form
// 2. import {useForm} from 'react-hook-form'
// 3. const {register, handleSubmit} = useForm()
// 4. register the inputs (i.e., TaskInput and MinutesInput) using {...register('inputName')}
// 5. create a function to handle the form submission > handleCreateNewCycle
// 6. register the function that handles the submit > form onSubmit={handleSubmit(handleCreateNewCycle)}

// By the default the react hook form doesn't have validation functions
// To do this you need a validation library, in this case we are going to use zod

// 1. npm i zod @hookform/resolvers > @hookform/resolvers > library that integrates the hook form with the validation library(zod)
// 2. import {zodResolver} from '@hookform/resolvers/zod' > don't forget the /zod at the end
// 3. import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Type your task'),
  minutes: zod
    .number()
    .min(5, 'Minutes should be between 5 and 60')
    .max(60, 'Minutes should be between 5 and 60'),
})

// When inferring a TypeScript variable based on a JavaScript structure, use `typeof`.
// This allows us to create an interface based on our validation schema. So if we add a new input field,
// we just need to update the validation schema, and the interface will be automatically updated.
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export function Home() {
  // We're basicallyng saying that our state will be an array of Cycles, and the initial value is an array
  const [cycles, setCycles] = useState<Cycle[]>([])
  // In order to keep track of the active cycle, we'll create a state responsible to save it's id
  // by doing that, we don't need to add another property in the interface like "isActive"
  // In this state, we're basically saying that it can be either be a string or null and the initial value is null
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // This state will be responsible to keep track of how many seconds have passed to update our counter
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // 2. These default values
      task: '',
      minutes: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    // We save the interval into an external variable so we can access in our return function at the end
    let interval: number

    if (activeCycle) {
      // Each second (1000ms), we'll calculate how many seconds have passed based on the current date
      // compared with the startDate of the activeCycle and update it using the setAmountSecondsPassed function
      // so our countdown works
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    // This return is a "cleanup" function, whenever the useEffect is re-runned it'll clear our interval
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    // Since we don't want any external library to generate the ID, we use the Date in the string type
    // After that we create our Cycle object and insert it into our Cycle array state:

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutes,
      startDate: new Date(),
    }

    // We're using an updater function to access the newest information of our array ((array)=> [])
    // After that we copy the information of the previous cycles inside the array (...array)
    // And then we insert the new cycle into the state (newCycle)
    setCycles((array) => [...array, newCycle])
    setActiveCycleId(id) // Whenever we create a new cycle, we update the active cycle id from null to the cycle's id
    setAmountSecondsPassed(0)
    // If we don't set the amont of seconds that have passed to 0
    // Whenever we start a new counter it'll start by dreacreasing the time that have passed
    // From the previous counter

    reset()
  }

  function handleInterrupCycle() {
    // We use the setCycles to iterate the cycles array
    setCycles(
      // It checks each cycle untill it finds the cycle that matches the activeCycleId
      cycles.map((cycle) => {
        // It copies the other values of the cycle using: ...cycle
        // And then updates the interruptedDate field
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    // After it updates the cycle, it sets the activeCycleId to null
    // this way it resets our counter
    setActiveCycleId(null)
  }

  // This line says that IF we HAVE a cycle, we'll multiply it's minutes by 60, otherwise the value will be 0
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // We transform the minutes amount into a string and use the padStart function to ensure it has 2 characters.
  // If the string has only 1 character, padStart fills it at the start with a '0'.
  const minutes = String(minutesAmount).padStart(2, '0')
  // The same goes for the seconds:
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  // When the tab is inactive, it’s normal to see the timer decrease by about 2 seconds.
  // This is due to browser optimizations in background tabs.
  // To accurately track the elapsed time, we use "differenceInSeconds" from 'date-fns' instead of relying solely on "setInterval",
  // as "differenceInSeconds" calculates the time difference precisely based on actual time passed.
  // We only use "setInterval" to trigger regular updates.

  // watch is a function that allows you to observe changes in input fields
  // In this case, we're watching the 'task' input field
  const task = watch('task') // Gets the current value of the 'task' input
  const isSubmitDisabled = !task // Disable the submit button if the task input is empty

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <TaskInput
            id="task"
            placeholder="project"
            list="task-suggestions"
            {...register('task')}
            // If there's an active cycle it'll disable the input
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutes">for</label>
          <MinutesInput
            id="minutes"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutes', { valueAsNumber: true })}
            // If there's an active cycle it'll disable the input
            disabled={!!activeCycle}
          />

          {/* The htmlFor attribute in a label links the label to a form element, in this case the input,
          specified by the id. This allows the user to click on the label to focus the input fiel */}

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {/* 
        If there IS an activeCycle it'll return the StopCountdownButton
        Otherwise, we'll have the start button, the logic is: 
        {activeCycle ? (stop button):(start button)}
        */}
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
