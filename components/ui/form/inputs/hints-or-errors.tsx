import { FieldValues, useFormContext } from "react-hook-form";
import { FiCheck, FiCircle, FiInfo, FiX } from "react-icons/fi";

export function HintsOrErrors<T extends FieldValues = FieldValues>(props: {
  hintErrors?: string[];
  fieldName: string;
}) {
  const methods = useFormContext() as ReturnType<typeof useFormContext> | null;
  /* If there's no methods it means we're using these components outside a React Hook Form context */
  if (!methods) return null;
  const { formState } = methods;
  const { hintErrors, fieldName } = props;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fieldErrors: FieldErrors<T> | undefined = formState.errors[fieldName];

  if (!hintErrors && fieldErrors && !fieldErrors.message) {
    // no hints passed, field errors exist and they are custom ones
    return (
      <div className="text-gray mt-2 flex items-center text-sm text-gray-700">
        <ul className="ml-2">
          {Object.keys(fieldErrors).map((key: string) => {
            return (
              <li key={key} className="text-blue-700">
                {`${fieldName}_hint_${key}`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (hintErrors && fieldErrors) {
    // hints passed, field errors exist
    return (
      <div className="text-gray mt-2 flex items-center text-sm text-gray-700">
        <ul className="ml-2">
          {hintErrors.map((key: string) => {
            const submitted = formState.isSubmitted;
            const error = fieldErrors[key] || fieldErrors.message;
            return (
              <li
                key={key}
                className={error !== undefined ? (submitted ? "text-red-700" : "") : "text-green-600"}>
                {error !== undefined ? (
                  submitted ? (
                    <FiX size="12" strokeWidth="3" className="-ml-1 inline-block ltr:mr-2 rtl:ml-2" />
                  ) : (
                    <FiCircle fill="currentColor" size="5" className="inline-block ltr:mr-2 rtl:ml-2" />
                  )
                ) : (
                  <FiCheck size="12" strokeWidth="3" className="-ml-1 inline-block ltr:mr-2 rtl:ml-2" />
                )}
                {`${fieldName}_hint_${key}`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // errors exist, not custom ones, just show them as is
  if (fieldErrors) {
    return (
      <div className="text-gray mt-2 flex items-center gap-x-2 text-sm text-red-700">
        <div>
          <FiInfo className="h-3 w-3" />
        </div>
        <p>{fieldErrors.message}</p>
      </div>
    );
  }

  if (!hintErrors) return null;

  // hints passed, no errors exist, proceed to just show hints
  return (
    <div className="text-gray mt-2 flex items-center text-sm text-gray-700">
      <ul className="ml-2">
        {hintErrors.map((key: string) => {
          // if field was changed, as no error exist, show checked status and color
          const dirty = formState.dirtyFields[fieldName];
          return (
            <li key={key} className={!!dirty ? "text-green-600" : ""}>
              {!!dirty ? (
                <FiCheck size="12" strokeWidth="3" className="-ml-1 inline-block ltr:mr-2 rtl:ml-2" />
              ) : (
                <FiCircle fill="currentColor" size="5" className="inline-block ltr:mr-2 rtl:ml-2" />
              )}
              {`${fieldName}_hint_${key}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
