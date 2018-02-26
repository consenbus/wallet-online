import React, { Component } from "react";

class Layout extends Component {
  render() {
    const { className, color, children } = this.props;
    return (
      <div
        className={className || ""}
        style={{
          position: "absolute",
          verticalAlign: "middle",
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: color || "#2252a3",
          color: "#F3F6F6"
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            padding: "20px",
            maxWidth: 450,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Layout;
