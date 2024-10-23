import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
} from './Home.styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <input id="task"></input>

          <label htmlFor="minutes">for</label>
          <input id="minutes"></input>

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
