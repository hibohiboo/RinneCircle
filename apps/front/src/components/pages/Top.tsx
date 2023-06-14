import { BasicLayout, RinneBuilderTop } from "@rinne-circle/components";
import { Link } from "react-router-dom";

export default function Top() {
  return BasicLayout(
    <RinneBuilderTop>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "80vw",
          height: "80vh",
        }}
      >
        <div>
          <div style={{}}>
            ないものは作ればいい。
            <a href="https://github.com/hibohiboo/RinneCircle" target="_blank">
              ♾
            </a>
          </div>
          <div>
            <Link to="/scenario/create">シナリオ作成</Link>
          </div>
        </div>{" "}
      </div>
    </RinneBuilderTop>,
  );
}
