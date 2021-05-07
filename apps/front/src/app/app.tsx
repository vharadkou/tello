import styles from './app.module.css';
import Sockette from 'sockette';
import { useEffect, useState } from 'react';

export function App() {
  const [ws, setWs] = useState<Sockette>();

  useEffect(() => {
    const wss = new Sockette(
      'wss://c8efbuti88.execute-api.eu-west-1.amazonaws.com/dev',
      {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: (e) => console.log('Connected:', e),
        onmessage: (e) => console.log('Message Received:', e),
        onreconnect: (e) => console.log('Reconnecting...', e),
        onmaximum: (e) => console.log('Stop Attempting!', e),
        onclose: (e) => console.log('Closed!', e),
        onerror: (e) => console.log('Error:', e),
      }
    );

    setWs(wss);
  }, []);

  const testMessage = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: testMessage',
        payload: 'FRONT COMMAND: testMessage',
      },
    });
  };

  const connectToDrone = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: connectToDrone',
      },
    });
  };

  const takeOff = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: takeOff',
      },
    });
  };

  const land = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: land',
      },
    });
  };

  const flip = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: flip',
      },
    });
  };

  const droneInfo = () => {
    ws.json({
      action: 'sendMessage',
      data: {
        action: 'FRONT COMMAND: droneInfo',
      },
    });
  };

  return (
    <div className={styles.app}>
      <button onClick={testMessage}>Test Message</button>
      <button onClick={connectToDrone}>Connect To Drone</button>
      <button onClick={takeOff}>Take Off</button>
      <button onClick={land}>Land</button>
      <button onClick={flip}>Flip</button>
      <button onClick={droneInfo}>Drone Info</button>
    </div>
  );
}

export default App;
