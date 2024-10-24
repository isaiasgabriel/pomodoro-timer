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
import { useState } from 'react'

// Controlled components - we store the user's input in React state, which allows us to monitor and update the component in real-time.
// Pros: More dynamic; we get real-time updates as the user interacts with the component.
// Cons: Each state change triggers a re-render, which in some cases can affect performance if the component is complex or the updates are frequent.

// In this case, we monitor the TaskInput. When the user fills in the input, we enable the start button.

export function Home() {
  const [task, setTask] = useState('')
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <TaskInput
            id="task"
            placeholder="project"
            list="task-suggestions"
            onChange={(e) => setTask(e.target.value)}
            value={task}
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

        <StartCountdownButton type="submit" disabled={!task}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
