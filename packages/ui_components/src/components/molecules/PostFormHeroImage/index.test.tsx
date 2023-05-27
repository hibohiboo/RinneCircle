import { BasicLayout } from "@/components/layouts/BasicLayout";
import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { PostFormHeroImage } from "./";
import { UpdateMyPostInput } from "@/lib/schema/MyPost";
import { MemoryRouter } from "react-router-dom";

function TestComponent({ error }: { error?: string }) {
  const { register, setValue } = useForm<UpdateMyPostInput>();
  return BasicLayout(
    <PostFormHeroImage
      register={register}
      setValue={setValue}
      name="imageUrl"
      error={error}
    />,
  );
}

setupMockServer(handleGetMyProfile());

test("画像が選択されていない時、ボタン表記は「イメージを選択する」", async () => {
  render(
    <MemoryRouter>
      <TestComponent />
    </MemoryRouter>,
  );
  expect(
    await screen.findByRole("button", { name: "イメージを選択する" }),
  ).toBeInTheDocument();
});

test("画像が選択されている時、ボタン表記は「イメージを変更する」", async () => {
  mockUploadImage();
  render(
    <MemoryRouter>
      <TestComponent />
    </MemoryRouter>,
  );
  const { selectImage } = selectImageFile();
  await selectImage();
  expect(
    await screen.findByRole("button", { name: "イメージを変更する" }),
  ).toBeInTheDocument();
});

test("画像選択でエラーがある時、ボタン表記はエラー文言になる", async () => {
  render(
    <MemoryRouter>
      <TestComponent error="エラー" />
    </MemoryRouter>,
  );
  expect(
    await screen.findByRole("button", { name: "エラー" }),
  ).toBeInTheDocument();
});

test("画像のアップロードに失敗した場合、アラートが表示される", async () => {
  mockUploadImage(500);
  render(
    <MemoryRouter>
      <TestComponent />
    </MemoryRouter>,
  );
  const { selectImage } = selectImageFile();
  await selectImage();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "画像のアップロードに失敗しました",
    ),
  );
});
