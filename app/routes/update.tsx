import type { LoaderArgs, Request } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

import {
  getProfileByEmail,
  updateProfile,
} from "~/features/profiles/profile.server";
import { Button, Card, Input, Label, InputGroup } from "~/components";
import { ROUTES } from "~/utils/routes";
import { getUser } from "~/features/users/user.server";

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");

  return json(profile);
}

export async function action({ request }: { request: Request }) {
  const user = await getUser(request);
  const profile = await getProfileByEmail(user.email || "");
  const formData = await request.formData();
  const url = formData.get("url") as string;
  const skills = formData.get("skills") as string;

  await updateProfile(profile!.id!, {
    url,
    skills: !skills ? [] : skills.split(","),
  });

  return redirect(ROUTES.HOME);
}

export default function Profile() {
  const { skills: skillsFromAPI, url } = useLoaderData();

  useEffect(() => {
    setSkills(skillsFromAPI);
  }, [skillsFromAPI]);

  const [skills, setSkills] = useState<string[]>(skillsFromAPI);

  const removeSkill = (skillToRemove: string) =>
    setSkills((previous) =>
      previous.filter((skill) => skill !== skillToRemove)
    );

  const formRef = useRef<HTMLFormElement>(null);

  const [currentSkill, setCurrentSkill] = useState("");

  const addCurrentSkill = () => {
    setSkills((previous) => [...previous, currentSkill]);
    setCurrentSkill("");
  };

  return (
    <Card title="Sobre você">
      <Label>Sua habilidades</Label>
      <ul className="mb-2">
        {skills?.map((skill: string, key: number) => (
          <li className="mb-2 flex justify-between gap-2" key={key}>
            <Input defaultValue={skill} disabled />
            <input name="skillToRemove" type="hidden" value={skill} />
            <Button onClick={() => removeSkill(skill)} small>
              x
            </Button>
          </li>
        ))}
      </ul>

      <InputGroup className="mb-2">
        <Input
          onChange={(event) => setCurrentSkill(event.currentTarget.value)}
          placeholder="Adicione uma habilidade"
          type="text"
          value={currentSkill}
        />
        <Button disabled={!currentSkill} onClick={addCurrentSkill} small>
          <span className="rotate-45">x</span>
        </Button>
      </InputGroup>

      <Form method="post" ref={formRef}>
        <input name="skills" type="hidden" value={skills} />

        <Label className="mb-8">
          Adicione uma rede social
          <Input defaultValue={url} name="url" type="text" />
        </Label>

        <Button full type="submit">
          Salvar
        </Button>
      </Form>
    </Card>
  );
}
