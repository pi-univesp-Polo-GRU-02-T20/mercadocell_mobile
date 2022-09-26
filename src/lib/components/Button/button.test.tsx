import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import DefaultButton from '.'

describe('<DefaultButton/>', () => {
    const buttonText = 'test';
  
    it('Should render button', () => {
      const { getByText } = render(<DefaultButton title={buttonText} />);
  
      const button = getByText(buttonText);
  
      expect(button).not.toBeNull();
    })

    it('Should press on button', () => {
      const pressButtonMock = jest.fn()

      const { getByText } = render(<DefaultButton title={buttonText} onPress={pressButtonMock} />);
  
      const button = getByText(buttonText);

      fireEvent.press(button)
  
      expect(pressButtonMock).toBeCalledTimes(1);
    })
})