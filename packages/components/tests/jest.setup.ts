import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect"; // pnpmの問題？ 型推論でtoBeInTheDocumentがこれを追加しないと出ない
import "whatwg-fetch"; // jestの中でfetchを使えるようにする。mswのテストをjestに組み込んだ際に使用。
