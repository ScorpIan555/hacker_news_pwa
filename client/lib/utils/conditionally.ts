export const conditionally = <Props, Result>(options: {
  if: (props: Props) => any;
  then: (props: Props) => Result | Result;
  else: (props: Props) => Result | Result;
}) => (props: Props) => {
  return options.if(props) ? options.then(props) : options.else(props);
};