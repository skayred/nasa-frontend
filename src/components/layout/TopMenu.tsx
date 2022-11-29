import React from "react";
import { Layout, Row, Col, Menu } from "antd";
import { useHistory } from "react-router-dom";

interface TopMenuProps {
  openLoginWindow(): void;
}

const pages = [
  {
    key: "main",
    label: "Main page",
  },
  {
    key: "asteroids",
    label: "Asteroids data",
  },
];

export const TopMenu = (props: TopMenuProps) => {
  const history = useHistory();

  return (
    <>
      <Layout.Header>
        <Menu
          style={{ width: '960px', margin: '0 auto' }}
          theme="dark"
          mode="horizontal"
          items={pages}
          onClick={(item: any) => (item.key === "asteroids") ? history.push(`/asteroids`) : history.push("/")}
        />
      </Layout.Header>
    </>
  );
};
