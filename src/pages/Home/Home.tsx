import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  TaskInput,
  MinutesInput,
} from './Home.styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <TaskInput id="task" placeholder="project" list="task-suggestions" />

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

        <button type="submit">
          <Play size={24} />
          Start
        </button>
      </form>
    </HomeContainer>
  )
}
