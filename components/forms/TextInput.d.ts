import * as React from 'react';
/**
 * 44px text field, 3px radius, 2px link-blue focus ring.
 * @startingPoint section="Forms" subtitle="Light and dark text inputs" viewport="700x300"
 */
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tone?: 'light' | 'dark'; label?: string; required?: boolean; error?: string;
}
export function TextInput(props: TextInputProps): JSX.Element;
/** Multi-line field; dark by default (Studio / content-agent forms). */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { tone?: 'light' | 'dark'; }
export function Textarea(props: TextareaProps): JSX.Element;
