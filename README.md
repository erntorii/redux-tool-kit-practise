# Redux Tool Kit practise

## create-react-app

```zsh
npx create-react-app . --template redux
```

## 準備

### Install package

```zsh
yarn add axios
```

### Chrome 拡張機能

`Redux DevTools`

## slice 概要

store の中で管理される、`state + reducer (+ action)` のひとかたまり。store の中で複数個持てる。

### 作成手順

#### 1. `@reduxjs/toolkit` から `createSlice` をインポートする

```js
import { createSlice } from "@reduxjs/toolkit";
```

#### 2. `createSlice` 関数の使用

- name の定義 - 複数の slice 識別のため
- initialState の定義 - 初期値の設定(value + 値)
- reducers の定義 - この中で action を定義する(action 名 + 実際の処理)  
  `action.payload` は引数の一種で、そのままの意味の通り、 action に引数を渡すことが出来るもの

#### 3. action をエクスポートする

- コンポーネントで action を使用できるようにするため

エクスポート

```js
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
```

使用例

```js
  const dispatch = useDispatch();
  ...
          onClick={() => dispatch(increment())}
```

#### 4. state の値をエクスポートする

- コンポーネントで state の値を参照できるようにするため

エクスポート

```js
export const selectCount = (state) => state.counter.value;
```

使用例(`useSelector` 関数で参照することができる)

```js
const count = useSelector(selectCount);
```

#### 5. slice の reducer 属性をエクスポートする

- `store` での一元管理のため
- `configureStore` で管理し、他の slice と**結合**させる

エクスポート

```js
export default counterSlice.reducer;
```

インポートと使用例

```js
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## コンポーネント側で必要なもの

- `useSelector` - state の値を参照
- `useDispatch` - action に応じて、dispatch を使用して action を store に伝達するもの

```js
import { useSelector, useDispatch } from "react-redux";
```

## index.js で必要なもの

- store - store をアプリ全体で使えるようにするためにインポートしておく
- Provider - store を割り当てた上で、子コンポーネントを定義すると、その子コンポーネントで store を使えるようになる

```js
import { store } from './app/store';
import { Provider } from 'react-redux';
...

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
```

## createAsyncThunk 概要

非同期処理を扱えるようになるもの。  
`dispatch` を使って呼び出すことができる。

インポート

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
```

- `axios`: API にアクセスするために必要なもの。
- 非同期処理は、slice 処理の外に書く決まりがある。

記述例

```js
const apiUrl = "https://jsonplaceholder.typicode.com/users";

export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
  const res = await axios.get(apiUrl);
  return res.data;
});
```

- 第 1 引数: action 名の定義。`slice名/メソッド名` という命名が一般的。
- 第 2 引数: async で関数の定義。

`extraReducers`: createSlice の属性で、API の処理が終わった後の後処理を書いておくもの。createAsyncThunk を使った場合に併せて記述する。

記述例

```js
const fetchSlice = createSlice({
  name: "fetch",
  initialState: { users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });
  },
});
```

- `fulfilled`: API 処理が成功した場合に起こす処理。(他には、`pending: 処理中`、`rejected: 失敗` がある)
- `...state`: state をスプレッド構文で記述することで、中身を分解させる。(今回は、users を取り出せるようにするため)
- `action.payload`: 今回の場合、fetchAsyncGet の返り値が渡されている。

コンポーネントから、取ってきた API を参照できるようにするため、エクスポートする

```js
export const selectUsers = (state) => state.fetch.users;
```

store への slice 追加を忘れないようにする

```js
...
import fetchReducer from '../features/fetch/fetchSlice';

export const store = configureStore({
  reducer: {
    ...
    fetch: fetchReducer,
  },
});
```
