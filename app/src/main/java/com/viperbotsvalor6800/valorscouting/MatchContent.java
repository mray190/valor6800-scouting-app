package com.viperbotsvalor6800.valorscouting;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.viperbotsvalor6800.valorscouting.MatchListActivity;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;

import static android.content.ContentValues.TAG;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p>
 * TODO: Replace all uses of this class before publishing your app.
 */
public class MatchContent {

    public static final String regional_code = "txpa";
    public static final String fileName = regional_code + "_matches";

    public static final List<MatchDetail> ITEMS = new ArrayList<MatchDetail>();

    public static final Map<String, MatchDetail> ITEM_MAP = new HashMap<String, MatchDetail>();

    public MatchContent() {
        FileInputStream fis = null;
        try {
            fis = MatchListActivity.getContext().openFileInput(fileName);
            ObjectInputStream is = new ObjectInputStream(fis);
            ArrayList<MatchDetail> matches = (ArrayList<MatchDetail>) is.readObject();
            for (MatchDetail match : matches) {
                addItem(match);
            }
            is.close();
            fis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void addItem(MatchDetail item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }
    
    public static void saveMatches() {
        FirebaseAuth mAuth = FirebaseAuth.getInstance();
        mAuth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if (task.isSuccessful()) {
                    FirebaseDatabase database = FirebaseDatabase.getInstance();
                    DatabaseReference myRef = database.getReference(regional_code +"/raw_results/");
                    myRef.addValueEventListener(new ValueEventListener() {
                        @Override
                        public void onDataChange(DataSnapshot dataSnapshot) {
                            // This method is called once with the initial value and again
                            // whenever data at this location is updated.
                            Iterable<DataSnapshot> matches = dataSnapshot.getChildren();
                            FileOutputStream fos = null;
                            ArrayList<MatchDetail> match_results = new ArrayList<>();
                            for (DataSnapshot currentMatch : matches) {
                                MatchDetail match = new MatchDetail();
                                match.alliance = currentMatch.child("alliance").getValue(String.class);
                                match.auto_line = currentMatch.child("auto_line").getValue(Boolean.class);
                                match.auto_scale = currentMatch.child("auto_scale").getValue(Integer.class);
                                match.auto_start = currentMatch.child("auto_start").getValue(String.class);
                                match.auto_switch = currentMatch.child("auto_switch").getValue(Integer.class);
                                match.comments = currentMatch.child("comments").getValue(String.class);
                                match.defensive_rating = currentMatch.child("defensive_rating").getValue(Integer.class);
                                match.hang_attempt = currentMatch.child("hang_attempt").getValue(Boolean.class);
                                match.hang_succeed = currentMatch.child("hang_succeed").getValue(Boolean.class);
                                match.hang_time = currentMatch.child("hang_time").getValue(Integer.class);
                                match.host_succeed = currentMatch.child("host_succeed").getValue(Boolean.class);
                                match.match_num = currentMatch.child("match_num").getValue(Integer.class);
                                match.team_num = currentMatch.child("team_num").getValue(Integer.class);
                                match.teleop_opp_switch = currentMatch.child("teleop_opp_switch").getValue(Integer.class);
                                match.teleop_scale = currentMatch.child("teleop_scale").getValue(Integer.class);
                                match.teleop_switch = currentMatch.child("teleop_switch").getValue(Integer.class);
                                match.teleop_vault = currentMatch.child("teleop_vault").getValue(Integer.class);
                                match_results.add(match);
                            }
                            try {
                                fos = MatchListActivity.getContext().openFileOutput(fileName, Context.MODE_PRIVATE);
                                ObjectOutputStream os = new ObjectOutputStream(fos);
                                os.writeObject(match_results);
                                os.close();
                                fos.close();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }

                        @Override
                        public void onCancelled(DatabaseError databaseError) {

                        }
                    });
                } else {
                    // If sign in fails, display a message to the user.
                    Log.e("Valor6800", "signInAnonymously:failure", task.getException());
                }
            }
        });
    }

    public static class MatchDetail {
        public int match_num, team_num, auto_scale, auto_switch, defensive_rating;
        public int teleop_opp_switch, teleop_scale, teleop_switch, teleop_vault;
        public String id, alliance, auto_start, comments;
        public boolean auto_line, hang_attempt, hang_succeed, host_succeed;
        public double hang_time;

        @Override
        public String toString() {
            return "Match: " + match_num + " Team: " + team_num;
        }
    }
}
