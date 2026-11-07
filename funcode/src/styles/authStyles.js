export const authStyles = {
  field: `
    tw:block tw:min-h-12 tw:w-full
    tw:rounded-xl
    tw:border tw:border-solid tw:border-funcode-line
    tw:bg-funcode-bg tw:px-4 tw:py-3
    tw:font-sans tw:text-base tw:text-funcode-text
    tw:placeholder:text-funcode-muted
    tw:transition-colors
    tw:focus:border-funcode-accent
    tw:focus:outline-2 tw:focus:outline-offset-2
    tw:focus:outline-funcode-accent/40
    tw:disabled:opacity-60
    tw:motion-reduce:transition-none
  `,

  label: `
    tw:mb-2 tw:block
    tw:text-sm tw:font-medium tw:text-funcode-text
  `,

  button: `
    tw:inline-flex tw:min-h-12 tw:w-full
    tw:items-center tw:justify-center tw:gap-3
    tw:rounded-xl tw:border-0
    tw:bg-funcode-accent tw:px-5 tw:py-3
    tw:font-sans tw:text-sm tw:font-semibold tw:text-funcode-bg
    tw:transition-colors
    tw:enabled:cursor-pointer tw:enabled:hover:bg-sky-200
    tw:disabled:cursor-not-allowed tw:disabled:opacity-60
    tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
    tw:focus-visible:outline-funcode-accent
    tw:motion-reduce:transition-none
  `,

  link: `
    tw:text-funcode-accent! tw:underline tw:underline-offset-4
    tw:hover:text-sky-200!
    tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
    tw:focus-visible:outline-funcode-accent
  `,

  error: `
    tw:rounded-xl
    tw:border tw:border-solid tw:border-funcode-danger/30
    tw:bg-funcode-danger/5 tw:p-4
    tw:text-sm tw:leading-relaxed tw:text-funcode-danger
  `,

  warning: `
    tw:rounded-xl
    tw:border tw:border-solid tw:border-funcode-warning/30
    tw:bg-funcode-warning/5 tw:p-4
    tw:text-sm tw:leading-relaxed tw:text-funcode-warning
  `,

  success: `
    tw:rounded-xl
    tw:border tw:border-solid tw:border-funcode-success/30
    tw:bg-funcode-success/5 tw:p-5
    tw:text-sm tw:leading-relaxed tw:text-funcode-success
  `,
};