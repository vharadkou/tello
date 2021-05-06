import styles from './app.module.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import Sockette from 'sockette';
import { useEffect, useState } from 'react';
//Init WebSockets with Cognito Access Token

export function App() {
  const [ws, setWs] = useState<Sockette>();
  const [data, setData] = useState<string>();

  useEffect(() => {
    const wss = new Sockette(
      'wss://c8efbuti88.execute-api.eu-west-1.amazonaws.com/dev',
      {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: (e) => {
          console.log('Connected:', e);
          setData('Connected');
        },
        onmessage: (e) => {
          console.log('Message Received:', e);
          setData(JSON.stringify(e.data));
        },
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
      data: 'FRONT: testMessage',
    });
  };

  const connectToDrone = () => {
    ws.json({
      action: 'sendMessage',
      data: 'FRONT: connectToDrone',
    });
  };

  const takeOff = () => {
    ws.json({
      action: 'sendMessage',
      data: 'FRONT: takeOff',
    });
  };

  const land = () => {
    ws.json({
      action: 'sendMessage',
      data: 'FRONT: land',
    });
  };

  const droneInfo = () => {
    ws.json({
      action: 'sendMessage',
      data: 'FRONT: droneInfo',
    });
  };
  console.log(data);
  return (
    <div className={styles.app}>
      <button onClick={testMessage}>Test Message</button>
      <button onClick={connectToDrone}>Connect to Drone</button>
      <button onClick={takeOff}>Take Off</button>
      <button onClick={land}>Land</button>
      <button onClick={droneInfo}>Drone Info</button>

      <pre>{data}</pre>
    </div>
  );
}

export default App;
