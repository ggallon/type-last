import React, { forwardRef, useId, useState } from "react";
import { FiX } from "react-icons/fi";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HintsOrErrors } from "./hints-or-errors";
import { Label } from "./label";

type InputProps = JSX.IntrinsicElements["input"] & { isFullWidth?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isFullWidth = true, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        "mb-2 block h-9 rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1",
        isFullWidth && "w-full",
        props.className
      )}
    />
  );
});

export type InputFieldProps = {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  hintErrors?: string[];
  addOnLeading?: React.ReactNode;
  addOnSuffix?: React.ReactNode;
  inputIsFullWidth?: boolean;
  addOnFilled?: boolean;
  addOnClassname?: string;
  error?: string;
  labelSrOnly?: boolean;
  containerClassName?: string;
} & React.ComponentProps<typeof Input> & {
  labelProps?: React.ComponentProps<typeof Label>;
  labelClassName?: string;
};

type AddonProps = {
  children: React.ReactNode;
  isFilled?: boolean;
  className?: string;
  error?: boolean;
};

const Addon = ({ isFilled, children, className, error }: AddonProps) => (
  <div
    className={cn(
      "addon-wrapper h-9 border border-gray-300 px-3",
      isFilled && "bg-gray-100",
      className
    )}>
    <div className={cn("flex h-full flex-col justify-center text-sm", error && "text-red-900")}>
      <span className="whitespace-nowrap py-2.5">{children}</span>
    </div>
  </div>
);

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const name = props.name || "";
  const {
    label = name,
    labelProps,
    labelClassName,
    placeholder = "",
    className,
    addOnLeading,
    addOnSuffix,
    addOnFilled = true,
    addOnClassname,
    inputIsFullWidth,
    hint,
    type,
    hintErrors,
    labelSrOnly,
    containerClassName,
    readOnly,
    ...passThrough
  } = props;

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className={cn(containerClassName)}>
      {!!name && (
        <Skeleton
          as={Label}
          htmlFor={id}
          loadingClassName="w-16"
          {...labelProps}
          className={cn(labelClassName, labelSrOnly && "sr-only", props.error && "text-red-900")}>
          {label}
        </Skeleton>
      )}
      {addOnLeading || addOnSuffix ? (
        <div className="group relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-800 focus-within:ring-offset-1">
          {addOnLeading && (
            <Addon
              isFilled={addOnFilled}
              className={cn(
                "ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0",
                addOnClassname
              )}>
              {addOnLeading}
            </Addon>
          )}
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            isFullWidth={inputIsFullWidth}
            className={cn(
              className,
              addOnLeading && "ltr:rounded-l-none rtl:rounded-r-none",
              addOnSuffix && "ltr:rounded-r-none rtl:rounded-l-none",
              type === "search" && "pr-8",
              "!my-0 !ring-0"
            )}
            {...passThrough}
            {...(type == "search" && {
              onChange: (e) => {
                setInputValue(e.target.value);
                props.onChange && props.onChange(e);
              },
              value: inputValue,
            })}
            readOnly={readOnly}
            ref={ref}
          />
          {addOnSuffix && (
            <Addon
              isFilled={addOnFilled}
              className={cn(
                "ltr:rounded-r-md ltr:border-l-0 rtl:rounded-l-md rtl:border-r-0",
                addOnClassname
              )}>
              {addOnSuffix}
            </Addon>
          )}
          {type === "search" && inputValue?.toString().length > 0 && (
            <FiX
              className="absolute top-2.5 h-4 w-4 cursor-pointer text-gray-500 ltr:right-2 rtl:left-2"
              onClick={(e) => {
                setInputValue("");
                props.onChange && props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          )}
        </div>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          {...passThrough}
          ref={ref}
          isFullWidth={inputIsFullWidth}
        />
      )}
      <HintsOrErrors hintErrors={hintErrors} fieldName={name} />
      {hint && <div className="text-gray mt-2 flex items-center text-sm text-gray-700">{hint}</div>}
    </div>
  );
});