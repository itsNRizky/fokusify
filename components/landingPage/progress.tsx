import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

type Props = {};

const ProgressList = [
  {
    num: 1,
    feature: "File management. For user to look their finished boards.",
    status: "Progress",
    date: "-",
  },
  {
    num: 2,
    feature:
      "Theme customization. You can change your background and set light/dark mode.",
    status: "Aired",
    date: "15 April 2024",
  },
  {
    num: 3,
    feature: "Google login. You now can login with your google account.",
    status: "Aired",
    date: "10 April 2024",
  },
  {
    num: 4,
    feature: "Local save feature. Make it more user friendly.",
    status: "Aired",
    date: "2 April 2024",
  },
];

const Progress = (props: Props) => {
  return (
    <section className="mx-auto w-4/5 md:px-6">
      <div>
        <h2 className="text-center text-4xl font-bold">
          It&apos;s on Beta Test Phase!
        </h2>
        <p className="text-center">
          Here are journeys of our in progress features
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Feature</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ProgressList.map((item) => (
            <TableRow key={item.num}>
              <TableCell className="font-medium">{item.num}</TableCell>
              <TableCell>{item.feature}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={
                    item.status === "Aired" ? "bg-green-500" : "bg-yellow-500"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Progress;
