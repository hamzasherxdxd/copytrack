import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import axios from "axios";

const ReportTable = (url) => {
  const [reports, setReport] = useState([]);
  const [sessions7Days, setSessions7Days] = useState([]);
  const [bounces7Days, setBounces7Days] = useState([]);
  const [transactions7Days, setTransactions7Days] = useState([]);

  const [sessions14Days, setSessions14Days] = useState([]);
  const [bounces14Days, setBounces14Days] = useState([]);
  const [transactions14Days, setTransactions14Days] = useState([]);

  const [sessions30Days, setSessions30Days] = useState([]);
  const [bounces30Days, setBounces30Days] = useState([]);
  const [transactions30Days, setTransactions30Days] = useState([]);

  //   console.log(url.url.url);

  const getReport30Days = () => {
    const options = {
      url: "http://localhost:3000/api/report/30",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        access_token: window.localStorage.getItem("access_token"),
        url: url.url.url,
      },
    };

    // console.log(localStorage.getItem("access_token"));
    axios(options)
      .then((response) => {
        // console.log(response.data.report.data);
        setReport(response.data.report);
        console.log(response.data.report.data);
        setSessions30Days([
          response.data.report.data.maximums[0].values[0],
          response.data.report.data.minimums[0].values[0],
          (
            (response.data.report.data.minimums[0].values[0] /
              response.data.report.data.maximums[0].values[0]) *
            100
          ).toFixed(2) + "%",
        ]);
        setBounces30Days([
          response.data.report.data.maximums[0].values[1],
          response.data.report.data.minimums[0].values[1],
          (
            (response.data.report.data.minimums[0].values[1] /
              response.data.report.data.maximums[0].values[1]) *
            100
          ).toFixed(2) + "%",
        ]);
        setTransactions30Days([
          response.data.report.data.maximums[0].values[2],
          response.data.report.data.minimums[0].values[2],
          (
            (response.data.report.data.minimums[0].values[2] /
              response.data.report.data.maximums[0].values[2]) *
            100
          ).toFixed(2) + "%",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReport14Days = () => {
    const options = {
      url: "http://localhost:3000/api/report/14",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        access_token: window.localStorage.getItem("access_token"),
        url: url.url.url,
      },
    };

    // console.log(localStorage.getItem("access_token"));
    axios(options)
      .then((response) => {
        // console.log(response.data.report.data);
        setReport(response.data.report);
        console.log(response.data.report.data);
        setSessions14Days([
          response.data.report.data.maximums[0].values[0],
          response.data.report.data.minimums[0].values[0],
          (
            (response.data.report.data.minimums[0].values[0] /
              response.data.report.data.maximums[0].values[0]) *
            100
          ).toFixed(2) + "%",
        ]);
        setBounces14Days([
          response.data.report.data.maximums[0].values[1],
          response.data.report.data.minimums[0].values[1],
          (
            (response.data.report.data.minimums[0].values[1] /
              response.data.report.data.maximums[0].values[1]) *
            100
          ).toFixed(2) + "%",
        ]);
        setTransactions14Days([
          response.data.report.data.maximums[0].values[2],
          response.data.report.data.minimums[0].values[2],
          (
            (response.data.report.data.minimums[0].values[2] /
              response.data.report.data.maximums[0].values[2]) *
            100
          ).toFixed(2) + "%",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReport7Days = () => {
    const options = {
      url: "http://localhost:3000/api/report/7",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        access_token: window.localStorage.getItem("access_token"),
        url: url.url.url,
      },
    };

    // console.log(localStorage.getItem("access_token"));
    axios(options)
      .then((response) => {
        // console.log(response.data.report.data);
        setReport(response.data.report);
        console.log(response.data.report.data);
        setSessions7Days([
          response.data.report.data.maximums[0].values[0],
          response.data.report.data.minimums[0].values[0],
          (
            (response.data.report.data.minimums[0].values[0] /
              response.data.report.data.maximums[0].values[0]) *
            100
          ).toFixed(2) + "%",
        ]);
        setBounces7Days([
          response.data.report.data.maximums[0].values[1],
          response.data.report.data.minimums[0].values[1],
          (
            (response.data.report.data.minimums[0].values[1] /
              response.data.report.data.maximums[0].values[1]) *
            100
          ).toFixed(2) + "%",
        ]);
        setTransactions7Days([
          response.data.report.data.maximums[0].values[2],
          response.data.report.data.minimums[0].values[2],
          (
            (response.data.report.data.minimums[0].values[2] /
              response.data.report.data.maximums[0].values[2]) *
            100
          ).toFixed(2) + "%",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReport7Days();
    getReport14Days();
    getReport30Days();
    // fetch("http://localhost:3000/api/ga").then((res) => res.json()).then((data) => {
    //     const reportData = data.find((d) => d.url === match.url);
    //     setReport(reportData);
    // }).catch((err) => {
    //     console.error(err);
    // });
  }, [url]);
  return (
    <>
      <TableBody>
        <>
          <TableRow>
            <TableCell>{url.url.url}</TableCell>
            <TableCell>{url.url.pub_date}</TableCell>
            {/* <TableCell>{url.pub_date}</TableCell>{" "} */}
            {/* <TableCell rowSpan={sessions.length + 1}>Sessions</TableCell> */}
            <TableCell>Sessions</TableCell>
            {sessions7Days &&
              sessions7Days.map((item) => (
                <TableRow>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            <TableCell>
              {sessions14Days &&
                sessions14Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>

            <TableCell>
              {sessions30Days &&
                sessions30Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Bounces</TableCell>
            {bounces7Days &&
              bounces7Days.map((item) => (
                <TableRow>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            <TableCell>
              {bounces14Days &&
                bounces14Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>

            <TableCell>
              {bounces30Days &&
                bounces30Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Transactions</TableCell>
            {transactions7Days &&
              transactions7Days.map((item) => (
                <TableRow>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}

            <TableCell>
              {transactions14Days &&
                transactions14Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>

            <TableCell>
              {transactions30Days &&
                transactions30Days.map((item) => (
                  <TableRow>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
            </TableCell>
          </TableRow>
        </>
      </TableBody>
    </>
  );
};

export default ReportTable;
