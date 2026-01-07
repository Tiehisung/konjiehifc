import { InjuriesManager } from "../admin/injuries/InjuresManager";
import { getPlayers } from "../admin/players/page";

const TestPage = async () => {
  const players = await getPlayers();
  console.log({ players });
  return (
    <div className="p-6 pt-16">
      <InjuriesManager />
    </div>
  );
};

export default TestPage;
