import { cn } from "@/lib/utils";

export function Label(props: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={cn("mb-2 block text-sm font-medium leading-none text-gray-700", props.className)}>
      {props.children}
    </label>
  );
}
