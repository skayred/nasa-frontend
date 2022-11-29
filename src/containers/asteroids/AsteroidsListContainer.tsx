import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { format, subDays } from "date-fns";

import { AsteroidsListComponent } from "../../components/asteroids/AsteroidsListComponent";
import { ASTEROIDS } from "./gql";

export const AsteroidsListContainer = () => {
  const [from, setFrom] = useState(subDays(new Date(), 5));
  const [to, setTo] = useState(subDays(new Date(), 1));
  const [amount, setAmount] = useState(3);

  const fromString = useMemo(() => format(from, "yyyy-MM-dd"), [from]);
  const toString = useMemo(() => format(to, "yyyy-MM-dd"), [to]);

  const { data, loading, error } = useQuery(ASTEROIDS, {
    variables: {
      from: fromString,
      to: toString,
      amount,
    },
    fetchPolicy: "network-only",
  });

  return (
    <AsteroidsListComponent
      error={error}
      loading={loading}
      proximityEvents={!loading && !error ? data.closestAsteroids : []}
      amount={amount}
      from={from}
      to={to}
      onAmountChanged={setAmount}
      onRangeChanged={(from: Date, to: Date) => {
        setFrom(from);
        setTo(to);
      }}
    />
  );
};
