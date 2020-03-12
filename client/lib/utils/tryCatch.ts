export function tryCatch<Props, Result>({
  tryer,
  catcher
}: {
  tryer: (props: Props) => Result;
  catcher: (props: Props, message: string) => Result;
}) {
  return (props: Props) => {
    try {
      return tryer(props);
    } catch (e) {
      return catcher(props, e.message);
    }
  };
}