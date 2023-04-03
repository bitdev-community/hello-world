import cx from 'classnames';
import { Button } from '../../ui/button';
import { Heading } from '../../ui/heading';
import { useHelloWorld } from '../../hooks/use-hello-world';
import './landing-page.scss'
import { HTMLAttributes } from 'react';

export type LandingPageProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>

export const LandingPage = ({className, ...rest}: LandingPageProps) => {
  const [helloWorldState, fetchHelloWorld] = useHelloWorld();


  if (helloWorldState.loading) {
    return <p {...rest}>Loading...</p>;
  }

  if (helloWorldState.error) {
    return <p {...rest}>Error: {helloWorldState.error.message}</p>;
  }
  
  return (
    <div className={cx("container", className)} {...rest}>
      {helloWorldState.data ? (
        <Heading>{helloWorldState.data}</Heading>
      ) : (
        <Button onClick={fetchHelloWorld}>Load Data</Button>
      )}
    </div>
  )
}