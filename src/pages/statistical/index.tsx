
import Layout from "@/components/Layout";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import CountUp from 'react-countup';

import { ROLE_NAMES } from "@/constants/value";
import { authSelector, getProductListSuccess, getProductPending } from "@/reducer";
import { getSupplier } from "@/services/api/auth.api";
import { getListCategory, getListProduct, getListProductByIdSupplier } from "@/services/api/product.api";
import { getStatistical, getStatisticalBySupplier, getStatisticalTotalBySupplier } from "@/services/api/statistical.api";
import { RootState } from "@/store";
import { IProduct } from "@/types/product";
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Row, Spin, Statistic } from "antd";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from "react";
import { Bar, Doughnut, getElementAtEvent, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface Props {

}
const lineColors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]
const formatter = (value: number) => <CountUp end={value} separator="," />;
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);
const Page = ({ }: Props) => {
    const { roleName, user } = useSelector(authSelector);
    const { productList } = useSelector(
        (state: RootState) => state.product
    );
    // const [dateStatistical, setDateStatistical] = useState({
    //     startDay: "24-12-2023",
    //     endDay: "27-12-2023"
    // })
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [dataLine, setDataLine] = useState<any>(null);
    const [dataBar, setDataBar] = useState<any>(null);
    const [supplierIdCurrent, setSupplierIdCurrent] = useState<any>(null);
    const [dataDoughnut, setDataDoughnut] = useState<any>(null);
    const chartRef = useRef(null);
    const [totalStatistical, setTotalStatistical] = useState<any>({
        total: 0,
        order: 0
    })
    const [dateStatistical, setDateStatistical] = useState({
        "startDay": "24-12-2023",
        "endDay": "27-12-2023"
    })
    const getDataAdmin = async () => {
        try {
            const res = await getStatistical(dateStatistical);
            if (res?.data) {
                const data = res?.data.sort((a: any, b: any) => a?.total - b?.total).slice(res?.data.length - 5, res?.data.length)
                setSupplierIdCurrent(res?.data[res?.data.length - 1]?._id)
                const total = data.reduce((acc: any, curr: any) => {
                    return acc + Number(curr?.total);
                }, 0);
                const order = data.reduce((acc: any, curr: any) => {
                    return acc + Number(curr?.productsSold);
                }, 0);
                setTotalStatistical((prev: any) => ({ ...prev, total: total, order: order }))
                const totalSupplier = data.map((item: any) => item?.total);
                const Links = data.map((item: any) => item?._id)
                const images = data.map((item: any) => item?.logoImage)

                const productsSold = data.map((item: any) => item?.productsSold);
                let newDataBar = {
                    labels: data.map((item: any) => item?.companyName?.split(" ")),
                    datasets: [
                        {
                            label: "Total",
                            data: totalSupplier,
                            type: "bar",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            links: Links,
                            images: images
                            // fill: true
                        },
                        {
                            label: "Order",
                            data: productsSold,
                            type: "bar",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                            links: Links,
                            images: images
                            // fill: true
                        },
                    ]
                }
                setDataBar(newDataBar)
            }

        } catch (error) {

        }
    }
    const getData = async () => {
        try {
            setIsLoading(true)
            let res;

            const supplier = await getSupplier();
            res = await Promise.all([getStatisticalBySupplier(supplierIdCurrent ?? supplier?.data?._id, dateStatistical),
            getStatisticalTotalBySupplier(supplierIdCurrent ?? supplier?.data?._id)]
            )

            if (roleName === ROLE_NAMES.SELLER) {
                const total = res[1]?.data.reduce((acc: any, curr: any) => {
                    return acc + Number(curr?.total);
                }, 0);
                const order = res[1]?.data.length
                setTotalStatistical((prev: any) => ({ ...prev, total: total, order: order }))
            }
            if (res[0]?.data) {
                const data = res[0]?.data;
                const keys = Object.keys(data)
                let values = Object.entries(Object.values(data)?.reduce((acc: any, item: any) => {
                    const keysItem = Object.keys(item);
                    let newAcc = { ...acc };
                    for (let index = 0; index < keysItem.length; index++) {
                        const value = item?.[keysItem[index]];
                        if (newAcc?.[keysItem[index]]) {
                            newAcc = {
                                ...newAcc,
                                [keysItem[index]]: [...acc?.[keysItem[index]], value]
                            }
                        } else {
                            newAcc = {
                                ...newAcc,
                                [keysItem[index]]: [value]
                            }
                        }
                    }
                    return newAcc
                }, {}) as unknown as {})?.map((item: any, index: number) => {
                    return {
                        label: item[0],
                        data: item[1],
                        borderColor: lineColors[index],
                        fill: false
                    }
                })

                let newDataLine = {
                    labels: keys,
                    datasets: values
                }
                setDataLine(newDataLine);
            }

            setIsLoading(false)

        } catch (error) {

        }
    };
    const { RangePicker } = DatePicker;
    const onCalendarChange = (values: any, formatString: any) => {
        // if (dates?.length) {
        //   setStartDate(dates[0]);
        //   setEndDate(dates[1]);
        // }
        setDateStatistical({ "startDay": formatString[0], "endDay": formatString[1] })
    };
    const getProductData = async () => {
        getProductPending("");
        await Promise.all([
            roleName === ROLE_NAMES.SELLER
                ? getListProductByIdSupplier()
                : getListProduct(),
            getListCategory(),
        ])
            .then((res: any) => {
                dispatch(
                    getProductListSuccess({
                        products: res[0]?.data,
                        categories: res[1]?.data,
                    })
                );
            })
            .catch((error: any) => {
                toast.error(error.message);
            });
    };
    useEffect(() => {
        if (user?._id) {
            if (roleName === ROLE_NAMES.SUPERUSER) {
                getDataAdmin()
            } else {
                getData()
            }
        }

        if (productList.length !== 0) {

            const productData = [...productList]?.sort((a: any, b: any) => b?.soldNumber - a?.soldNumber)?.slice(0, 5).map((item: IProduct) => ({
                [item.nameProduct]: item.soldNumber
            })).reduce((acc: any, cur: any) => {
                return {
                    ...acc,
                    ...cur
                }
            }, {});
            const newDataDoughnut = {
                labels: Object.keys(productData),
                datasets: [
                    {
                        label: "Sold number",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850"
                        ],
                        data: Object.values(productData)
                    }
                ]
            }
            setDataDoughnut(newDataDoughnut)
        } else {
            getProductData()
        }
    }, [roleName, user, productList])
    useEffect(() => {
        if (supplierIdCurrent) {
            getData()
        }
    }, [supplierIdCurrent])
    const xScaleImage = {
        id: 'xScaleImage',
        afterDatasetDraw(chart: any, args: any, plugins: any) {
            const { ctx, data, chartArea: { bottom }, scales: { x, y } } = chart;
            ctx.save();
            data.datasets[0].images.forEach((element: any, index: number) => {
                const label = new Image();
                label.src = element;
                const width = 24;
                if (!element) {
                    label.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK-cqV-aGe4jcDrt9MXAkp_uGOBFsBbmlLunQuD2xCt7pNXCdhVsL4ZTIqCRvakX81QTg&usqp=CAU"
                }
                ctx.drawImage(label, x.getPixelForValue(index) - (width / 2), y.top, width, width)
            });

        }
    }
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
                    <Statistic title="Total" value={totalStatistical?.total} formatter={formatter} />
                </Col>
                <Col span={12}>
                    <Statistic title="Orders" formatter={formatter} value={totalStatistical?.order} precision={2} />
                </Col>
            </Row>
            <br />
            <br />

            {/* <Area {...config} /> */}
            {
                roleName === ROLE_NAMES.SUPERUSER && dataBar &&
                <div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-1/2 flex flex-col justify-between items-center gap-4">
                            <i style={{
                                fontSize: 28
                            }}>Thống kê nhà cung cấp</i>
                            <Bar
                                ref={chartRef}
                                data={dataBar}
                                options={{
                                    // layout: {
                                    //     padding: 30
                                    // },
                                    plugins: {
                                        tooltip: {
                                            callbacks: {

                                                title: (context) => {
                                                    console.log(context[0].label);
                                                    return context[0].label.replaceAll(",", " ")
                                                }
                                            }
                                        }
                                    }
                                    // scales: {
                                    //     x: {
                                    //         ticks: {
                                    //             callback: ((value, index, values) => {
                                    //                 return ''
                                    //             })
                                    //         }
                                    //     }
                                    // }
                                }}
                                plugins={[xScaleImage]}
                                onClick={(event: any) => {
                                    if (getElementAtEvent(chartRef.current, event).length > 0) {
                                        const clickItem = getElementAtEvent(chartRef.current, event)[0];
                                        const datasetIndex = clickItem?.datasetIndex;
                                        const dataPoint = clickItem?.index;
                                        setSupplierIdCurrent(dataBar?.datasets[datasetIndex].links[dataPoint])
                                    }
                                }}
                            />
                        </div>
                        <div className="w-[30rem] h-[30rem] flex flex-col items-center">
                            <i style={{
                                fontSize: 28
                            }}>Top 5 sản phẩm được bán chạy</i>
                            {dataDoughnut && <Doughnut
                                data={dataDoughnut}
                                option={{
                                    title: {
                                        display: true,
                                        text: "Thống kê các sản phẩm"
                                    }
                                }}

                            />}
                        </div>

                    </div>
                </div>
            }

            <div className="w-96 flex flex-col gap-1">
                <p style={{
                    display: 'flex',
                    marginBottom: '20px',
                    fontFamily: "sans-serif",
                    fontSize: '19px',
                    fontWeight: 400
                }}>Chọn khoảng thời gian</p>
                <div className="flex gap-3">

                    <RangePicker
                        value={Object.values(dateStatistical)?.map((item: string) => dayjs(item, "DD-MM-YYYY"))}
                        format="DD-MM-YYYY"
                        showTime={{ format: "DD-MM-YYYY" }}
                        onChange={onCalendarChange}
                    />
                    <Button onClick={() => getData()}>
                        Submit
                    </Button>
                </div>
            </div>
            <br />
            {isLoading ?
                <Spin className="w-full" indicator={<LoadingOutlined style={{ fontSize: 45, marginTop: 100 }} spin />} />
                :
                <div
                    className="flex flex-row justify-between items-center"
                >

                    {dataLine && <div className="w-1/2 flex flex-col justify-between items-center gap-4">
                        <i style={{
                            fontSize: 28
                        }}>Thống kê theo ngày của nhà cung cấp</i>

                        <Line
                            data={dataLine}
                            options={{
                                title: {
                                    display: true,
                                    text: "Thống kê theo ngày, tổng hóa đơn và tổng tiền"
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }}

                        />
                    </div>
                    }
                    {roleName === ROLE_NAMES.SELLER && <div className="w-[30rem] h-[30rem] flex flex-col items-center">
                        <i style={{
                            fontSize: 28
                        }}>Top 5 sản phẩm được bán chạy</i>
                        {dataDoughnut && <Doughnut
                            data={dataDoughnut}
                            option={{
                                title: {
                                    display: true,
                                    text: "Thống kê các sản phẩm"
                                }
                            }}

                        />}
                    </div>}
                </div>}

        </div>
    )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true