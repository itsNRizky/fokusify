import React from "react";

type Props = {};

const AllInOne = (props: Props) => {
  return (
    <section className="mx-auto space-y-4 px-6 sm:w-4/5">
      <h2 className="text-4xl font-bold md:w-4/5 md:text-5xl lg:w-1/2">
        Notes, Todolist, Pomodoro. Simple, all in one place
      </h2>
      <p className="text-xl md:w-4/5 lg:w-1/2">
        Plan your task for today, keep track of your progress, write some notes
        in one board. Simple and natural, just like your focus board.
      </p>
    </section>
  );
};

export default AllInOne;
