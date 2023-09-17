import React from "react";

const Asset = ({
    id,
    mfr,
    floor_no,
    asset_type,
    room_no,
    install_date,
    last_serviced_date,
    repairs_ct,
    uptime,
    work_orders_ct 
}) => {


    return (<div>
        <p>Asset {id} at Floor {floor_no}, Room {room_no}</p>
        <p>asset_type: {asset_type} by manufacturer {mfr}</p>
        <p>Installed {install_date}, Last Service on {last_serviced_date}. uptime: {uptime}</p>
        <p>Repaired {repairs_ct} times, {work_orders_ct} historical work orders</p>
    </div>)
}

export default Asset;