"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
    fontSize: 11,
    color: "#1a1a1a",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
  },
  sectionBorder: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #E0E0E0",
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 600,
    color: "#213743",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    width: "35%",
  },
  value: {
    fontSize: 11,
    width: "65%",
  },
  signatureLine: {
    marginTop: 20,
    marginBottom: 10,
  },
});

// Props
interface PlayerConsentFormProps {
  player?: IPlayer;
}

// Component
export default function PlayerConsentForm({ player }: PlayerConsentFormProps) {
  const fullName = `${player?.firstName} ${player?.lastName}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>PLAYER PARTICIPATION & CONSENT FORM</Text>
        <View style={styles.sectionBorder}>
          <View style={styles.row}>
            <Image
              src={kfc.logo}
              style={{
                width: 90,
                height: 90,
                borderRadius: 99999996,
                marginBottom: 10,
              }}
            />

            {player?.avatar && (
              <Image
                src={player?.avatar}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              />
            )}
          </View>
        </View>

        {/* Program Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Overview</Text>
          <Text>
            Konjiehi FC is dedicated to developing young talent from the
            Konjiehi community. The youth program trains student players after
            school and during free time to nurture their skills for future
            benefit.
          </Text>
          <Text style={{ marginTop: 5 }}>
            Parent/guardian consent is critical as trainings can sometimes
            involve risks, including time commitment outside home hours and
            possible injuries.
          </Text>
        </View>

        {/* Player Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Player Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>
              {formatDate(player?.dob, "March 2, 2025")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Jersey Number:</Text>
            <Text style={styles.value}>{player?.number}</Text>
          </View>
        </View>

        {/* Parent/Guardian Info */}
        {player?.manager && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Parent / Guardian Information
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>
                {player?.manager?.fullname ?? "—"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Relationship:</Text>
              <Text style={styles.value}>Manager</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{player?.manager?.phone ?? "—"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{player?.manager?.email ?? "—"}</Text>
            </View>
          </View>
        )}

        {/* Consent Statement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consent Statement</Text>
          <Text>
            By signing below, I, the parent/guardian of the player named in this
            form, give full consent for my child to participate in Konjiehi
            FC&apos;s youth program. I understand the risks involved and agree
            to support the program&apos;s schedules and rules.
          </Text>
        </View>

        {/* Signature Lines */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.signatureLine}>
            Player Signature: ________________________________________________
          </Text>
          <Text style={styles.signatureLine}>
            Parent/Guardian Signature: _______________________________________
          </Text>
          <Text style={styles.signatureLine}>
            Coach/Manager Signature: _________________________________________
          </Text>
        </View>
      </Page>
    </Document>
  );
}
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { IPlayer } from "@/app/players/page";
import { kfc } from "@/data/kfc";
import { formatDate } from "@/lib/timeAndDate";
import { PrimaryCollapsible } from "../Collapsible";

export function ConsentForm({ player }: { player?: IPlayer }) {
  if (!player) {
    return <div>No player data available.</div>;
  }
  return (
    <div>
      <PDFDownloadLink
        document={<PlayerConsentForm player={player} />}
        fileName={`${player?.firstName}-${player?.lastName}-consent.pdf`}
        className="_primaryBtn"
      >
        Download Consent Form
      </PDFDownloadLink>
      <PrimaryCollapsible header={{ label: "Preview" }}>
        <PDFViewer width="100%" height={800}>
          <PlayerConsentForm player={player} />
        </PDFViewer>
      </PrimaryCollapsible>
    </div>
  );
}
