import React, { useMemo } from "react";
import { Alert, DatePicker, Form, Select, Spin, Table } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

import { ProximityEvent } from "../../types";
import { ApolloError } from "@apollo/client";
import { formatDistance, parse } from "date-fns";

interface AsteroidsListComponentProps {
  error?: ApolloError;
  loading: boolean;
  proximityEvents: ProximityEvent[];
  amount: number;
  from: Date;
  to: Date;
  onAmountChanged(amount: number): void;
  onRangeChanged(from: Date, to: Date): void;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Happened at",
    dataIndex: "happenedAt",
    key: "happenedAt",
  },
  {
    title: "Distance",
    dataIndex: "missDistance",
    key: "missDistance",
  },
];

const items = Array(9)
  .fill(0)
  .map((_, i: number) => ({ value: i, label: `${i}` }));

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current >= dayjs().endOf("day");
};

export const AsteroidsListComponent = (props: AsteroidsListComponentProps) => {
  const asteroids = useMemo(
    () =>
      props.proximityEvents.map((prox: ProximityEvent) => ({
        id: prox.id,
        name: !!prox.asteroid ? prox.asteroid.name : "NONAME00",
        happenedAt: formatDistance(
          parse(prox.happenedAt || "", "yyyy-MM-dd", new Date()),
          new Date(),
          { addSuffix: true }
        ),
        missDistance: prox.missDistance,
      })),
    [props.proximityEvents]
  );

  if (!!props.loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      {!!props.error && (
        <Alert
          message="Error happened"
          description={props.error.message}
          type="error"
        />
      )}
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Date range">
          <DatePicker.RangePicker
            disabledDate={disabledDate}
            value={[dayjs(props.from), dayjs(props.to)]}
            onChange={(value: any) => {
              if (value.length > 1) {
                props.onRangeChanged(value[0]["$d"], value[1]["$d"]);
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Amount of asteroids to show">
          <Select
            value={props.amount}
            onSelect={props.onAmountChanged}
            options={items}
          />
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={asteroids}
        pagination={false}
      />
    </div>
  );
};
