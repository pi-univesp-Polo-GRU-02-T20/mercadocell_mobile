import React, { FC } from "react";
import { Button } from "react-native";

interface ButtonProps {
    title: string;
}

const DefaultButton: FC<ButtonProps> = ({ title }) => <Button title={title} />

export default DefaultButton