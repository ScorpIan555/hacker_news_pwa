export async function tryCatch<Props, Result>({
  tryer,
  catcher
}: {
  tryer: (props: Props) => Result;
  catcher: (props: Props, message: string) => Result;
}) {
  return async (props: Props) => {
    try {
      const res = await tryer(props);
      return res;
    } catch (e) {
      console.log('catcher?', e);
      return catcher(props, e.message);
    }
  };
}
