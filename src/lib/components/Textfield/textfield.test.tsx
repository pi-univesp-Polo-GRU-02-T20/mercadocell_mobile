import { fireEvent, render } from '@testing-library/react-native';
import React from 'react'
import TextField from '.';

describe('<TextField/>', () => {
    const textfieldID = 'testID_textfield';
    const text = 'Test';
  
    it('Should render text field', () => {
      const { getByTestId } = render(
        <TextField onChangeText={() => {}} value={''} />,
      );
  
      //get input
      const input = getByTestId(textfieldID);
  
      expect(input).not.toBeNull();
    });

    it('Should change text from text field', () => {
        const onChangeTextMock = jest.fn();
    
        const { getByTestId } = render(
          <TextField
            onChangeText={onChangeTextMock}
            value={onChangeTextMock.mock.calls[0]}
          />
        );
    
        const input = getByTestId(textfieldID);
    
        //Change text on input
        fireEvent.changeText(input, text);

        expect(onChangeTextMock).toBeCalledWith(text);
    });
})  