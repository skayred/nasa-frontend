import React from "react";
import { Button, Card } from "antd";
import { useHistory } from "react-router-dom";

export const DefaultLanding = () => {
  const history = useHistory();

  return (
    <div>
      <Card
        title="Welcome to the implementation of the technical assignment!"
        extra={<Button type="link" onClick={() => history.push("/asteroids")}>See the asteroids!</Button>}
        style={{ width: "100%" }}
      >
        <p>This is the main page of the application</p>
        <p>
          If you would like to see the list of closest asteroids - press the
          button below
        </p>
        <Button type="primary" onClick={() => history.push("/asteroids")}>
          See the asteroids right now
        </Button>
      </Card>
    </div>
  );
};
