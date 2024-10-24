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

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: any) {
    console.log(data) // this function is basically printing the user input on the console
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
