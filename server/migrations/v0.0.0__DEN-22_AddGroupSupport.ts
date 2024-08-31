import { MigrateOptions } from "fireblaze";

export async function migrate({ firestore }: MigrateOptions) {
  // Get a new write batch
  const batch = firestore.batch();

  const transactions = await firestore.collection("transaction").get();
  await Promise.all(
    transactions.docs.map(async (snapshot) => {
      const doc = snapshot.ref;
      //await doc.update({ group: null });
      batch.update(doc, { group: null });
    }),
  );
  // Commit the batch
  await batch.commit();
}
