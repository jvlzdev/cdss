import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Row,
  Space,
  Table,
  message,
} from "antd";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HistoryOutlined } from "@ant-design/icons";

function Implementation() {
  const location = useLocation();
  const data = location.state?.data;
  const [isClickable, setIsClickable] = useState(false);
  const [newAssessDetailData, setNewAssessDetailData] = useState(null);
  console.log("get planning", data);

  const [messageApi, contextHolder] = message.useMessage();

  const [newAssessmentData, setNewAssessmentData] = useState(null);

  const handleAddRow = () => {
    const newRow = {
      key: (newAssessmentData.length + 1).toString(),
      date: "",
      foodBeverage: "",
    };
    setNewAssessmentData([...newAssessmentData, newRow]);
  };

  const columns = [
    {
      title: "Date",
      key: "date",
      width: "20%",
      render: (record) => {
        return (
          <>
            <DatePicker
              required
              showTime
              // onChange={onChangeDatePicker}
              className="rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1 w-full"
            />
          </>
        );
      },
    },
    {
      title: "Food and Beverage intake",
      key: "foodBeverage",
      render: (record) => {
        return (
          <>
            <textarea
              type="text"
              // onChange={(e) => setFirstName(e.target.value)}
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1 h-32"
              disabled={!isClickable}
              style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setNewPatientData((pre) => {
                  return { ...pre, medHistory: e.target.value };
                });
              }}
            />
          </>
        );
      },
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Diagnosis saved successfully!",
    });
  };

  const warning = (props) => {
    messageApi.open({
      type: "warning",
      content: `${!isEmpty(props) ? props : "Please input data"}`,
    });
  };

  const getSideData = () => {
    return (
      <div>
        <div>
          <img src="https://fakeimg.pl/240x150?text=Image" />
        </div>
        <div className="font-bold text-xl my-3">{`${data?.firstName} ${data?.lastName}`}</div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Gender</div>
          <div className="font-bold">{data?.gender}</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Age</div>
          <div className="font-bold">{data?.age}</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Height</div>
          <div className="font-bold">{data?.height} /cm</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Weight</div>
          <div className="font-bold">{data?.weight} /kg</div>
        </div>
      </div>
    );
  };

  const getMainData = () => {
    return (
      <>
        {contextHolder}
        <div className="grid grid-cols-4 mb-10">
          <div>
            <div className="text-gray-700 text-sm">Last Name</div>
            <div className="font-bold">{data?.lastName}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">First Name</div>
            <div className="font-bold">{data?.firstName}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Birth Date</div>
            <div className="font-bold">{data?.birthday}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 mb-10">
          <div>
            <div className="text-gray-700 text-sm">Address</div>
            <div className="font-bold">{data?.homeAddress}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Phone</div>
            <div className="font-bold">{data?.phoneNumber}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Email</div>
            <div className="font-bold">{data?.email}</div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div>
            <div className="text-gray-700 text-sm">Nationality</div>
            <div className="font-bold">{data?.nationality}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Marital Status</div>
            <div className="font-bold">{data?.maritalStatus}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Religion</div>
            <div className="font-bold">{data?.religion}</div>
          </div>
        </div>
      </>
    );
  };

  const onClickEditDetails = () => {
    setIsClickable(!isClickable);
  };

  const onClickSaveDetails = () => {
    console.log("savedata", newAssessDetailData);
    if (!isEmpty(newAssessDetailData)) {
      // save to db
      success();
    }

    if (isEmpty(newAssessDetailData)) warning();

    setIsClickable(false);
  };

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit">
            {getSideData()}
          </div>
          {/* <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit mt-4">
                {getOutPatients()}
              </div> */}
        </div>
        <div className="rounded-lg bg-white p-4 col-span-10 shadow-md h-auto">
          <div className="col-span-12">
            <div className="grid grid-cols-3 bg-gray-600 text-center text-white p-4 text-2xl font-extrabold">
              <div>DIAGNOSIS</div>
              <div>IMPLEMENTATION</div>
              <div>RATIONALE</div>
            </div>
            {data?.diagnosis === 1 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                <div className="border p-2">
                  (1) Deficient Fluid Volume related to diarrhea as evidenced by
                  dry mucous membranes, decreased skin turgor, and pale skin.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Encourage the use of oral rehydration solutions (ORS)
                        that contain electrolytes such as Gatorade and smart
                        water.
                      </div>
                      <div>
                        2. Recommend products such as natural fiber, plain
                        natural yogurt, and Lactinex.
                      </div>
                      <div>3. Limit caffeine and high fiber fruits.</div>
                      <div>
                        4. Promote use of relaxation techniques such as
                        progressive relaxation exercise, and visualization
                        techniques.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. To replace lost fluids and salts (Doenges, M. et al.,
                        2022).
                      </div>
                      <div>
                        2. According to Doenges (2022), To promote the
                        restoration of normal intestinal flora and balance of
                        glucose and electrolytes.
                      </div>
                      <div>
                        3. To prevent overstimulating the digestive tract and
                        making diarrhea symptoms worse (Doenges, M. et al.,
                        2022).
                      </div>
                      <div>
                        4. To alleviate the stress and anxiety of the client
                        (Doenges, M. et al., 2022).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Assess vital signs and symptoms of dehydration (e.g.,
                        skin turgor, mucous membranes) every 4 hours to detect
                        early signs of fluid volume deficit.
                      </div>
                      <div>
                        2. Administer antidiarrheal medication, as indicated, to
                        decrease gastrointestinal motility and minimize fluid
                        losses.
                      </div>
                      <div>
                        3. Monitor total intake and output, including stool
                        output as possible. Provide estimation of fluid needs.
                      </div>
                      <div>4. Review results of laboratory testing.</div>
                      <div>5. Promote tepid sponge bath.</div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. To assess vital signs and symptoms of dehydration
                        every 4 hours is essential for early detention,
                        effective treatment, and risk management. To intervene
                        promptly and prevent complications associated with fluid
                        volume deficit (Cumpian, 2023).
                      </div>
                      <div>
                        2. To reduce fluid loss, minimize electrolyte loss, and
                        to prevent complications (Vera, 2023).
                      </div>
                      <div>
                        3. To assist in maintaining optimal hydration status and
                        prevent complications related to fluid imbalances
                        (MedlinePlus, 2023).
                      </div>
                      <div>
                        4. To assess disease status, monitor treatment efficacy,
                        detecting complications early, managing medications
                        safely, assessing risk, providing follow-up care, and
                        ensuring quality assurance in patient care (World Health
                        Organization, 2023).
                      </div>
                      <div>
                        5. To justify the effectiveness in reducing fever,
                        managing heat-related illnesses, providing comfort and
                        hygiene, promoting skin health, offering pain relief,
                        serving as an adjunct therapy, and non-invasive
                        intervention (Hasan et al., 2021).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Provide for changes in dietary intake to avoid foods
                        or substances that precipitate diarrhea.
                      </div>
                      <div>
                        2. Restrict solid food intake, as indicated, to allow
                        for bowel rest and reduced intestinal workload
                      </div>
                      <div>
                        3. Administer IV fluids, electrolytes, enteral and
                        parenteral fluids, as indicated.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. To promote digestive health, prevent infection, and
                        manage gastrointestinal conditions (Cleveland Clinic,
                        2021).
                      </div>
                      <div>
                        2. To further support the healing process while
                        minimizing the risk of complications or exacerbating
                        underlying gastrointestinal conditions (Tweed, 2023).
                      </div>
                      <div>
                        3. To revolve around correcting dehydration, restoring
                        electrolyte balance, providing essential nutrients,
                        supporting metabolic needs, managing critical illness,
                        and facilitating medication administration (MedlinePlus,
                        2023).{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 2 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                <div className="border p-2">
                  (2) Risk for Electrolyte Imbalance related to intense vomiting
                  and diarrhea leading to fluid and electrolyte loss.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Offer the client commercially available ORT solutions
                        or homemade solutions (if appropriate) to promote fluid
                        and electrolyte replacement.
                      </div>
                      <div>
                        2. Regularly monitor vital signs, including temperature,
                        heart rate, blood pressure, and respiratory rate, to
                        assess for signs of shock or worsening dehydration.
                      </div>
                      <div>
                        3. Continue to measure and document all intake and
                        output as described previously.
                      </div>
                      <div>
                        4. Assess skin turgor, mucous membranes, and capillary
                        refill to evaluate hydration status.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. Oral Rehydration Therapy (ORT) is a safe and
                        effective way to rehydrate patients with mild to
                        moderate dehydration and can be initiated by the nurse
                        without a physicians order (World Health Organization,
                        2006).
                      </div>
                      <div>
                        2. According to the National Council of State Boards of
                        Nursing, (n.d), vital signs provide clues to the
                        patients overall health status and can help identify
                        potential complications.{" "}
                      </div>
                      <div>
                        3. Ongoing monitoring remains crucial to evaluate the
                        effectiveness of interventions and guide further
                        management.
                      </div>
                      <div>
                        4. A study published in the Journal of Clinical Nursing,
                        (2020), emphasizes the importance of skin assessment as
                        a non-invasive approach for detecting dehydration among
                        adults. According to the study, skin examination
                        provides extra information about hydration status and
                        probable fluid loss.
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT AND COLLABORATIVE
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        5. If oral rehydration is ineffective or the client is
                        unable to tolerate oral intake, collaborate with the
                        physician to initiate intravenous (IV) fluid therapy to
                        address dehydration and electrolyte imbalances.
                      </div>
                      <div>
                        6. Collaborate with the physician to obtain laboratory
                        tests, including electrolytes (sodium, potassium,
                        chloride, bicarbonate), blood urea nitrogen (BUN), and
                        creatinine, to assess hydration status and electrolyte
                        balance.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        5. IV fluids provide a faster and more controlled method
                        of rehydration in severe cases (Ambardekar, 2023).
                      </div>
                      <div>
                        6. Lab tests provide a more objective picture of the
                        patients electrolyte levels and guide further treatment
                        decisions (MedlinePlus, 2022).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 3 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                <div className="border p-2">
                  (3) Acute Pain related to gastrointestinal inflammation as
                  evidenced by the patients self-report of abdominal cramps
                  rating 7/10 on the pain scale.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Assess characteristics of pain (location, intensity,
                        duration, quality, aggravating/relieving factors).
                      </div>
                      <div>
                        2. Monitor vital signs (blood pressure, heart rate,
                        respiratory rate) for potential physiological responses
                        to pain.
                      </div>
                      <div>
                        3. Offer relaxation techniques (e.g., guided imagery,
                        deep breathing) to promote pain relief and reduce
                        anxiety.{" "}
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. Different forms of pain respond better to specific
                        treatments. Understanding location and quality enables
                        healthcare practitioners to personalize treatment
                        methods. Furthermore, periodically measuring pain
                        intensity enables healthcare providers to analyze the
                        efficacy of drugs or other pain management measures and
                        make adjustments as needed (Joint Commission
                        International, 2020).
                      </div>
                      <div>
                        {`2. Pain activates the body's "fight-or-flight" response, causing physiological changes. Increased heart rate, respiration rate, and blood pressure may indicate the body's response to pain (Mayo Clinic, n.d). `}
                      </div>
                      <div>
                        {`3. According to the National Center for Complementary and Integrative Health (n.d.), pain perception is influenced by both physiological and psychological variables. Relaxation practices can trigger the body's relaxation response, which counteracts the stress reaction linked with pain.`}
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        4. Administer prescribed pain medication according to
                        the physicians order, including route, dosage, and
                        frequency. Monitor for medication effectiveness and side
                        effects.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        4. Medication prescribed by the doctor can directly
                        target the underlying cause of pain and provide relief
                        (Wong, D. L., & Hayes, V. C., 2009).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        5. Collaborate with a dietician to develop a
                        personalized dietary plan that addresses potential food
                        triggers (e.g., lactose intolerance, gluten
                        sensitivity).
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        5. RDs have a thorough understanding of food and
                        nutrition, including the effects of certain foods on
                        specific disorders such as lactose intolerance or gluten
                        sensitivity. As a result, if the pain is due to an
                        underlying ailment (for example, inflammatory bowel
                        disease), the RD can establish a specialized diet plan
                        to treat the condition and perhaps decrease pain.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 4 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                <div className="border p-2">
                  (4) Risk for Imbalanced Nutrition: Less Than Body Requirements
                  related to nausea, vomiting, and diarrhea as evidenced by
                  decreased oral intake.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Assess current weight compared to usual weight and
                        norms for age, gender, and body size.
                      </div>
                      <div>
                        2. Auscultate presence and character of bowel sounds
                        determine ability and readiness of intestinal tract to
                        handle digestive processes.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. To promote health and well-veing across various life
                        stages (Pronk et al., 2020).
                      </div>
                      <div>
                        2. To evaluate gastrointestinal function, detecting
                        abnormalities, diagnosing gastrointestinal disorders,
                        and ensuring proper digestion and absorption of
                        nutrients (GIS, 2020).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        3. Administer pharmaceutical agents, as indicated:
                        vitamin and mineral (iron) supplements, digestive drugs
                        or enzymes and medications
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        3. To address specific health issues, managing symptoms,
                        preventing complications, and promoting overall
                        well-being based on individual patient needs and
                        clinical indications (Kwame & Petrucka, 2021).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        4. Collaborate with an interdisciplinary team to set
                        nutritional goals.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        4. To ensure comprehensive assessment and individualized
                        care, promote goal alignment and patient education, and
                        ultimately optimize outcomes related to nutrition
                        (Netzer & Elboim-Gabyzon, 2023).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 5 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                <div className="border p-2">
                  (5) Activity Intolerance related to fatigue and diarrhea as
                  evidenced by decreased activity level and reports of feeling
                  tired.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        1. Assess cardiopulmonary response to physical activity,
                        including vital signs, before, during, and after
                        activity.
                      </div>
                      <div>
                        2. Note clients reports of weakness, fatigue, pain, and
                        difficulty accomplishing tasks.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        1. To promote safety, optimize training outcomes and
                        ensure overall well-being during exercise (World Health
                        Organization, 2022).
                      </div>
                      <div>
                        2. Comprehensive assessment, diagnosis, treatment
                        planning, monitoring progress, fostering collaboration,
                        and improving clients’ quality of life (Wayne, 2023).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        3. Provide and monitor response to supplemental oxygen,
                        medications, and changes in treatment regimen.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        3. To optimize patient outcomes, managing respiratory
                        and cardiovascular conditions, preventing complications,
                        assessing treatment efficacy, promoting patient
                        education and compliance (McGowan et al., 2023).
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 border">
                      <div>
                        4. Determine the client’s current activity level and
                        physical condition with observation, exercise-capacity
                        testing, or use of a functional-level classification
                        system.
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div>
                        4. Baseline assessment, risk stratification, exercise
                        prescription, progress monitoring, safety promotion, and
                        delivering patient-centered care to individual needs and
                        goals (Lucini & Pagani, 2021).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-between mt-5">
            <Link
              to="/planning"
              state={{ data: { ...newAssessDetailData, ...data } }}
              className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
            >
              Back to Planning {`(${data?.diagnosis})`}
            </Link>
            <Link
              to="/evaluation"
              state={{ data: { ...newAssessDetailData, ...data } }}
              className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
            >
              Proceed to Evaluation {`(${data?.diagnosis})`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Implementation;
