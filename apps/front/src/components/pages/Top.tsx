import { RinneBuilderTop } from "@rinne-circle/components";
import { Link } from "react-router-dom";

export default function Top() {
  return (
    <RinneBuilderTop>
      <div>
        ないものは作ればいい。
        <a href="https://github.com/hibohiboo/RinneCircle" target="_blank">
          ♾
        </a>
      </div>
      <Link to="/scenario/create">シナリオ作成</Link>
    </RinneBuilderTop>
  );
}
