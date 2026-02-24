interface ContainerProps {
    children: React.ReactNode
}

const ContainerPage = (props: ContainerProps) => {
  const { children } = props;
  return (
    <div
      className="w-full max-w-6xl px-4 pb-32
        mx-auto mt-40 md:pb-28 md:px-6"
    >
      {children}
      
    </div>
  );
};
export default ContainerPage;