
import Layout from "@/components/Layout";
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import CountUp from 'react-countup';

import { Button, Col, DatePicker, Row, Statistic } from "antd";
import { Doughnut, Line } from "react-chartjs-2";

interface Props {

}
const formatter = (value: number) => <CountUp end={value} separator="," />;
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
const Page = ({ }: Props) => {
    const { RangePicker } = DatePicker;
    const onCalendarChange = (dates: any, dateStrings: any, info: any) => {
        console.log(dates);
        console.log(dateStrings);
        console.log(info);
        // if (dates?.length) {
        //   setStartDate(dates[0]);
        //   setEndDate(dates[1]);
        // }
    };
    return (
        <div className="flex flex-col gap-3">
            {/* <p className={styled.reports_management_title}>Reports Management</p> */}
            <p style={{
                display: 'flex',
                marginBottom: '20px',
                fontFamily: "sans-serif",
                fontSize: '25px',
                fontWeight: 600
            }}>Statistical Management</p>

            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Users" value={112893} formatter={formatter} />
                </Col>
                <Col span={12}>
                    <Statistic title="Account Balance (CNY)" formatter={formatter} value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} >
                        Recharge
                    </Button>
                </Col>
            </Row>
            <br />
            <br />

            {/* <Area {...config} /> */}
            <div className="w-96 flex flex-col gap-1">
                <p style={{
                    display: 'flex',
                    marginBottom: '20px',
                    fontFamily: "sans-serif",
                    fontSize: '19px',
                    fontWeight: 400
                }}>Chọn khoảng thời gian</p>
                <RangePicker
                    format="DD-MM-YYYY"
                    onCalendarChange={onCalendarChange}

                />
            </div>
            <br />
            <div
                className="flex flex-row justify-between"
            >

                <div className="w-1/2">
                    <Line
                        data={{
                            labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                            datasets: [
                                {
                                    data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                                    label: "Africa",
                                    borderColor: "#3e95cd",
                                    fill: false
                                },
                                {
                                    data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                                    label: "Asia",
                                    borderColor: "#8e5ea2",
                                    fill: false
                                },
                                {
                                    data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                                    label: "Europe",
                                    borderColor: "#3cba9f",
                                    fill: false
                                },
                                {
                                    data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                                    label: "Latin America",
                                    borderColor: "#e8c3b9",
                                    fill: false
                                },
                                {
                                    data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                                    label: "North America",
                                    borderColor: "#c45850",
                                    fill: false
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: "World population per region (in millions)"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }}
                    />
                </div>
                <div className="w-[30rem] h-[30rem]">

                    <Doughnut
                        data={{
                            labels: [
                                "Africa",
                                "Asia",
                                "Europe",
                                "Latin America",
                                "North America"
                            ],
                            datasets: [
                                {
                                    label: "Population (millions)",
                                    backgroundColor: [
                                        "#3e95cd",
                                        "#8e5ea2",
                                        "#3cba9f",
                                        "#e8c3b9",
                                        "#c45850"
                                    ],
                                    data: [2478, 5267, 734, 784, 433]
                                }
                            ]
                        }}
                        option={{
                            title: {
                                display: true,
                                text: "Predicted world population (millions) in 2050"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true