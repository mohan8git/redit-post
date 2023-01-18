import React from "react";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import "./styles.css";

const ListCard = ({ resultFromApi }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}


    </Space>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={resultFromApi.data.children}
      footer={
        <div>
          <b>Fynd</b> Some extra information
        </div>
      }
      className="list"
      renderItem={(item) => (
        <List.Item
          key={item.data.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={item.data.thumbnail}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.data.thumbnail} />}
            title={<a href={`https://www.reddit.com${item.data.permalink}`}>{item.data.title}</a>}
            description={item.data.author}
          />
          {item.data.selftext}
        </List.Item>
      )}
    />
  );
}

export default ListCard;