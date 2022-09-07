import React from 'react'
import { render } from '@testing-library/react-native'
import DefaultButton from '.'

describe('<DefaultButton/>', () => {
    const buttonText = 'test';
  
    it('Should render button', () => {
      const { getByText } = render(<DefaultButton title={buttonText} />);
  
      const button = getByText(buttonText);
  
      expect(button).not.toBeNull();
    })
})