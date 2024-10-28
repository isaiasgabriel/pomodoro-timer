import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  TaskInput,
  MinutesInput,
  StartCountdownButton,
} from './Home.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // 2. These default values
      task: '',
      minutes: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data) // this function is basically printing the user input on the console
    reset() // 1. The reset function return the input to the default value, if you don't specify it, it won't work
  }

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
          />

          {/* The htmlFor attribute in a label links the label to a form element, in this case the input,
          specified by the id. This allows the user to click on the label to focus the input fiel */}

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
