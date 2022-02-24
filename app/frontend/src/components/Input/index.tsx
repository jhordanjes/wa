// Componente input utilizando o Formik. Capturando erros e focus.
import React, { InputHTMLAttributes, useState, FocusEvent } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputMask from 'react-input-mask';
import { Container, Content, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mask?: string;
}

interface MaskInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string;
}

function MaskInput({ field, mask, ...rest }: FieldProps & MaskInputProps) {
  return <InputMask {...field} mask={mask} type="text" {...rest} />;
}

export function Input({ name, label, mask, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFilled(!!e.target.value);
    setIsFocused(false);
  };

  return (
    <Container>
      <label htmlFor={name}>{label}</label>

      <Content isFocused={isFocused} isFilled={isFilled}>
        {!mask ? (
          <Field
            id={name}
            name={name}
            as="input"
            {...rest}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        ) : (
          <Field
            id={name}
            name={name}
            {...rest}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            component={MaskInput}
            mask={mask}
          />
        )}
      </Content>

      <ErrorMessage name={name} render={msg => <Error>{msg}</Error>} />
    </Container>
  );
}
