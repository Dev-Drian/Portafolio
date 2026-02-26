interface ContainerProps {
    children: React.ReactNode
}

const ContainerPage = (props: ContainerProps) => {
  const { children } = props;
  return (
    <div
      className="w-full max-w-6xl px-4 sm:px-6 pb-24 sm:pb-28 md:pb-32
        mx-auto mt-28 sm:mt-32 md:mt-40"
    >
      {children}
      
    </div>
  );
};
export default ContainerPage;