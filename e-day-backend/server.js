const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Add this line to enable CORS

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function initBrowser(formData) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(formData.url, { waitUntil: 'networkidle0' });
    return page;
}

async function sourceFind(page, formData) {
    // await page.waitForSelector('[data-automation-id="sourceSection"]');
    const sourceSectionExists = await page.$('[data-automation-id="sourceSection"]');
    const sourceDropdownExists = await page.$('[data-automation-id="sourceDropdown"]');
    const sourcePromptExists = await page.$('[data-automation-id="multiSelectContainer"]');
    if (formData.sourceFind === "") {
        console.log('no Source skip it');
    } else
        if (formData.sourceFind)
            if (sourceSectionExists) {
                if (sourceDropdownExists) {
                    console.log('Element with data-automation-id="sourceDropdown" exists.');
                    sourceSectionExists.click();
                    // Wait for the popup to appear
                    await page.waitForSelector('.wd-popup', { visible: true, timeout: 5000 });
                    // Check if the popup is visible
                    const isPopupVisible = await page.evaluate(() => {
                        const popup = document.querySelector('.wd-popup');
                        return popup !== null && window.getComputedStyle(popup).display !== 'none';
                    });

                    if (isPopupVisible) {
                        console.log('Popup is showing.');
                        await delay(500);
                        // Click on the element with text "LinkedIn"
                        await page.waitForXPath(`//div[text()="${formData.sourceFind}"]`);
                        const element = await page.$x(`//div[text()="${formData.sourceFind}"]`);
                        await element[0].click();
                        console.log('Clicked on LinkedIn');
                    } else {
                        console.log('Popup is not showing.');
                    }
                } else if (sourcePromptExists) {
                    await delay(1000);
                    console.log('Element with data-automation-id-prompt="multi select container" exists.');
                    // Click the button to open the dropdown
                    sourcePromptExists.click()
                    await page.waitForSelector('[data-automation-id="multiSelectContainer"]', { visible: true, timeout: 5000 });
                    // Types in linkedin and presses enter
                    await sourcePromptExists.type(`     ${formData.sourceFind}  `);
                    await page.keyboard.press('Enter');
                    await page.keyboard.press('Enter');
                    console.log('Linkedin Pressed');
                } else {
                    console.log('Element with data-automation-id-prompt="source section" does not exist.');
                }
            }
}

//data-automation-id="previousWorker"
// Clicks either 1 for yes or 2 for no option for Have I previously been imployed
async function prevEmployed(page, formData) {
    // await page.waitForSelector('[data-automation-id="previousWorker"]');
    const prevWorkerButton = await page.$('[data-automation-id="previousWorker"]');
    if (formData.prevEmployed === "") {
        console.log('no Previous Employed selected skip it');
    } else
        if (prevWorkerButton) {
            console.log('Element with data-automation-id"previous worker" exists.');
            // Wait for the options label to become visible
            await page.waitForTimeout(500);
            await page.waitForXPath('//label[text()="Yes"]');
            await page.waitForXPath('//label[text()="No"]');
            // Click on the option
            await page.$eval(`label[for="${formData.prevEmployed}"]`, aform => aform.click());
        } else {
            console.log('Element with data-automation-id="previous worker" does not exist.');
        }
}

// Clicks the specific option (United States) for country
//data-automation-id="countryDropdown"
async function countryFrom(page, formData) {
    // await page.waitForSelector('[data-automation-id="countryDropdown"]');
    const countryExists = await page.$('[data-automation-id="countryDropdown"]');
    if (formData.countryFrom === "") {
        console.log('no Country input skip it');
    } else
        if (countryExists) {
            await page.$eval('[data-automation-id="countryDropdown"]', form => form.click());
            // Wait for the popup to appear
            await page.waitForSelector('.wd-popup', { visible: true, timeout: 5000 });
            // Check if the popup is visible
            const isPopupVisible = await page.evaluate(() => {
                const popup = document.querySelector('.wd-popup');
                return popup !== null && window.getComputedStyle(popup).display !== 'none';
            });

            if (isPopupVisible) {
                console.log('Popup is showing.');
                await page.waitForTimeout(500);
                // Click on the element with text "United States of America"
                await page.waitForXPath(`//div[text()="${formData.countryFrom}"]`);
                const element = await page.$x(`//div[text()="${formData.countryFrom}"]`);
                await element[0].click();
                console.log('Clicked on USA');
            } else {
                console.log('Popup is not showing.');
            }
        } else {
            console.log('Element with data-automation-id-prompt="country" does not exist.');
        }
}

// data-automation-id="legalNameSection_firstName"
// fills in the first name text box
async function firstName(page, formData) {
    // await page.waitForSelector('[data-automation-id="legalNameSection_firstName"]');
    const firstNameExists = await page.$('[data-automation-id="legalNameSection_firstName"]');
    if (formData.firstName === "") {
        console.log('no First Name input skip it');
    } else
        if (firstNameExists) {
            console.log('Element with data-automation-id"first name" exists.');
            // Fills in the first name text box 
            firstNameExists.type(formData.firstName);
            await delay(500);
        } else {
            console.log('Element with data-automation-id-prompt="first name" does not exist.');
        }
}

//data-automation-id="legalNameSection_lastName"  
// fills in the first name text box
async function lastName(page, formData) {
    // await page.waitForSelector('[data-automation-id="legalNameSection_lastName"]');
    const lastNameExists = await page.$('[data-automation-id="legalNameSection_lastName"]');
    if (formData.lastName === "") {
        console.log('no Last name skip it');
    } else
        if (lastNameExists) {
            console.log('Element with data-automation-id"last name" exists.');
            // Fills in the last name text box 
            lastNameExists.type(formData.lastName);
            await delay(500);
        } else {
            console.log('Element with data-automation-id-prompt="last name" does not exist.');
        }
}

//data-automation-id="addressSection_addressLine1"
// fills in the address section 1 text box
async function addy1(page, formData) {
    // await page.waitForSelector('[data-automation-id="addressSection_addressLine1"]');
    const addy1Exists = await page.$('[data-automation-id="addressSection_addressLine1"]');
    if (formData.addy1 === "") {
        console.log('no Address 1 input skip it');
    } else
        if (addy1Exists) {
            console.log('Element with data-automation-id"address line 1" exists.');
            // Fills in the addy1 text box 
            addy1Exists.type(formData.addy1);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="address line 1" does not exist.');
        }
}

//data-automation-id="addressSection_addressLine2"
// fills in the address section 2 text box
async function addy2(page, formData) {
    // await page.waitForSelector('[data-automation-id="addressSection_addressLine2"]');
    const addy2Exists = await page.$('[data-automation-id="addressSection_addressLine2"]');
    if (formData.addy2 === "") {
        console.log('no Address 2 input skip it');
    } else
        if (addy2Exists) {
            console.log('Element with data-automation-id"address line 2" exists.');
            // Fills in the addy2 text box 
            addy2Exists.type(formData.addy2)
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="address line 2" does not exist.');
        }
}

// Check if an element city exists
//data-automation-id="addressSection_city"
async function addressCity(page, formData) {
    // await page.waitForSelector('[data-automation-id="addressSection_city"]');
    const cityExists = await page.$('[data-automation-id="addressSection_city"]');
    if (formData.addressCity === "") {
        console.log('no City input skip it');
    } else
        if (cityExists) {
            console.log('Element with data-automation-id"city" exists.');
            // Fills in the County text box 
            cityExists.type(formData.addressCity);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="city" does not exist.');
        }
}

//data-automation-id="addressSection_countryRegion"
async function addressState(page, formData) {
    const stateExists = await page.$('[data-automation-id="addressSection_countryRegion"]');
    if (formData.addressState === "") {
        console.log('no State input skip it');
    } else
        if (stateExists) {
            await page.$eval('[data-automation-id="addressSection_countryRegion"]', form => form.click());
            // Wait for the popup to appear
            await page.waitForSelector('.wd-popup', { visible: true, timeout: 5000 });
            // Check if the popup is visible
            const isPopupVisible = await page.evaluate(() => {
                const popup = document.querySelector('.wd-popup');
                return popup !== null && window.getComputedStyle(popup).display !== 'none';
            });

            if (isPopupVisible) {
                console.log('Popup is showing.');
                await page.waitForTimeout(500);
                // Click on the element with text "Illinois"
                await page.waitForXPath(`//div[text()="${formData.addressState}"]`);
                const element = await page.$x(`//div[text()="${formData.addressState}"]`);
                await element[0].click();
                console.log('Clicked on Illinois');
            } else {
                console.log('Popup is not showing.');
            }
        } else {
            console.log('Element with data-automation-id-prompt="state" does not exist.');
        }

}

// Check if an element Postal Code exists
//data-automation-id="addressSection_postalCode"
async function addressPostalCode(page, formData) {
    // await page.waitForSelector('[data-automation-id="addressSection_postalCode"]');
    const postalCodeExists = await page.$('[data-automation-id="addressSection_postalCode"]');
    if (formData.addressPostalCode === "") {
        console.log('no Zip Code input skip it');
    } else
        if (postalCodeExists) {
            console.log('Element with data-automation-id"postal code" exists.');
            // Fills in the postal/zip code text box 
            postalCodeExists.type(formData.addressPostalCode);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="postal code" does not exist.');
        }
}

// Check if an element county exists
async function addressCounty(page, formData) {
    const countyExists = await page.$('[data-automation-id="addressSection_regionSubdivision1"]');
    if (formData.addressCounty === "") {
        console.log('no County input skip it');
    } else
        if (countyExists) {
            console.log('Element with data-automation-id"address section (county)" exists.');
            // Fills in the County text box 
            countyExists.type(formData.addressCounty);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="address section (county)" does not exist.');
        }
}

// Check if an element email exists
async function emailFunction(page, formData) {
    // await page.waitForSelector('[data-automation-id="email"]');
    const emailExists = await page.$('[data-automation-id="email"]');
    if (formData.emailFunction === "") {
        console.log('no email input skip it');
    } else
        if (emailExists) {
            console.log('Element with data-automation-id"email" exists.');
            // Fills in the email text box 
            emailExists.type(formData.emailFunction);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="email" does not exist.');
        }
}

// Check if an element with data-automation-id-prompt="country-phone-code" exists
async function countryPhoneCode(page, formData) {
    // await page.waitForSelector('[data-automation-id="formField-country-phone-code"]');
    const countryPhoneCodeExists = await page.$('[data-automation-id="formField-country-phone-code"]');
    if (formData.countryPhoneCode === "") {
        console.log('no Country Phone Code input skip it');
    } else
        if (countryPhoneCodeExists) {
            console.log('Element with data-automation-id-prompt="formField-country-phone-code" exists.');
            // Click the button to open the dropdown
            countryPhoneCodeExists.click();
            // Types in United states of america and presses enter
            await page.waitForTimeout(500);
            await countryPhoneCodeExists.type(formData.countryPhoneCode);
            await page.keyboard.press('Enter');
        } else {
            console.log('Element with data-automation-id-prompt="formField-country-phone-code" does not exist.');
        }
}

//data-automation-id="phone-number"
// Check if an element phone number exists
async function phoneNumber(page, formData) {
    // await page.waitForSelector('[data-automation-id="phone-number"]');
    const phoneNumberExists = await page.$('[data-automation-id="phone-number"]');
    if (formData.phoneNumber === "") {
        console.log('no phone number input skip it');
    } else
        if (phoneNumberExists) {
            console.log('Element with data-automation-id"phone-number" exists.');
            // Fills in the phone number text box 
            phoneNumberExists.type(formData.phoneNumber);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="phone-number" does not exist.');
        }
}

// Check if an element with data-automation-id="deviceType" exists
//data-automation-id="phone-device-type"
async function phoneDeviceType(page, formData) {
    // await page.waitForSelector('[data-automation-id="phone-device-type"]');
    const phoneDeviceTypeExists = await page.$('[data-automation-id="phone-device-type"]');
    if (formData.phoneDeviceType === "") {
        console.log('no phone device type input skip it');
    } else
        if (phoneDeviceTypeExists) {
            await page.$eval('[data-automation-id="phone-device-type"]', form => form.click());
            // Wait for the popup to appear
            await page.waitForSelector('.wd-popup', { visible: true, timeout: 5000 });
            // Check if the popup is visible
            const isPopupVisible = await page.evaluate(() => {
                const popup = document.querySelector('.wd-popup');
                return popup !== null && window.getComputedStyle(popup).display !== 'none';
            });

            if (isPopupVisible) {
                console.log('Popup is showing.');
                await page.waitForTimeout(500);
                // Click on the element with text "Mobile"
                await page.waitForXPath(`//div[text()="${formData.phoneDeviceType}"]`);
                const element = await page.$x(`//div[text()="${formData.phoneDeviceType}"]`);
                await element[0].click();
                console.log('Clicked on Mobile');
            } else {
                console.log('Popup is not showing.');
            }
        } else {
            console.log('Element with data-automation-id-prompt="phone device type" does not exist.');
        }
}

// taps the next button on the bottom of the page
//data-automation-id="bottom-navigation-next-button"
async function nextButtonClick(page) {
    // await page.waitForSelector('[data-automation-id="bottom-navigation-next-button"]');
    const nextButton = await page.$('[data-automation-id="bottom-navigation-next-button"]');
    if (nextButton) {
        console.log('Element with data-automation-id"next button" exists.');
        nextButton.click();
        await page.waitForTimeout(2000);
    } else {
        console.log('Element with data-automation-id="next button" does not exist.');
    }
}

//data-automation-id="jobTitle"
async function jobTitle(page, formData) {
    // await page.waitForSelector('[data-automation-id="jobTitle"]');
    await page.waitForTimeout(500);
    const jobTitleExists = await page.$('[data-automation-id="jobTitle"]');
    if (formData.jobTitle === "") {
        console.log('no job title input skip it');
    } else
        if (jobTitleExists) {
            console.log('Element with data-automation-id jobTitle" exists.');
            // clicks the button
            jobTitleExists.type(formData.jobTitle);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="jobTitle" does not exist.');
        }
}

//data-automation-id="company"
async function companyTitle(page, formData) {
    // await page.waitForSelector('[data-automation-id="company"]');
    const companyTextExists = await page.$('[data-automation-id="company"]');
    if (formData.companyTitle === "") {
        console.log('no company title input skip it');
    } else
        if (companyTextExists) {
            console.log('Element with data-automation-id company" exists.');
            // Fills in the phone number text box 
            companyTextExists.type(formData.companyTitle);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="company" does not exist.');
        }
}

async function jobLocation(page, formData) {
    // await page.waitForSelector('[data-automation-id="location"]');
    const locationTextExists = await page.$('[data-automation-id="location"]');
    if (formData.jobLocation === "") {
        console.log('no job location input skip it');
    } else
        if (locationTextExists) {
            console.log('Element with data-automation-id location" exists.');
            // Fills in the phone number text box 
            locationTextExists.type(formData.jobLocation);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="location" does not exist.');
        }
}

//data-automation-id="formField-startDate"
//data-automation-id="dateSectionMonth-input"
//data-automation-id="dateSectionYear-input"
// Define the desired month and year for start and end dates
async function startYearMonth(page, formData) {
    // await page.waitForSelector('[data-automation-id="formField-startDate"]');
    const startDateMonthExists = await page.$('[data-automation-id="formField-startDate"]');
    if (formData.startMonth === "") {
        console.log('no start month or year input skip it');
    } else
        if (startDateMonthExists) {
            // Function to type text into the input field
            const typeInput = async (selector, text) => {
                await page.focus(selector); // Focus on the input field
                await page.$eval(selector, el => el.value = ''); // Clear existing text
                await page.type(selector, text, { delay: 100 }); // Type the new text with a delay
            };

            // Type the start date month and year
            await typeInput('[data-automation-id="formField-startDate"] [data-automation-id="dateSectionMonth-input"]', formData.startMonth);
            await typeInput('[data-automation-id="formField-startDate"] [data-automation-id="dateSectionYear-input"]', formData.startYear);
        } else {
            console.log('Element with data-automation-id-prompt "Date selection month" does not exist.');
        }
}

//data-automation-id="formField-endDate"
//data-automation-id="dateSectionMonth-input"
//data-automation-id="dateSectionYear-input"
async function endYearMonth(page, formData) {
    // await page.waitForSelector('[data-automation-id="formField-endDate"]');
    const endDateMonthExists = await page.$('[data-automation-id="formField-endDate"]');
    if (formData.endMonth === "") {
        console.log('no end month or year input skip it');
    } else
        if (endDateMonthExists) {
            // Function to type text into the input field
            const typeInput = async (selector, text) => {
                await page.focus(selector); // Focus on the input field
                await page.$eval(selector, el => el.value = ''); // Clear existing text
                await page.type(selector, text, { delay: 100 }); // Type the new text with a delay
            };
            // Type the end date month and year
            await typeInput('[data-automation-id="formField-endDate"] [data-automation-id="dateSectionMonth-input"]', formData.endMonth);
            await typeInput('[data-automation-id="formField-endDate"] [data-automation-id="dateSectionYear-input"]', formData.endYear);
        } else {
            console.log('Element with data-automation-id-prompt "end Date selection month" does not exist.');
        }
    await page.waitForTimeout(2000);
}

async function roleDescription(page, formData) {
    // await page.waitForSelector('[data-automation-id="description"]');
    const roleDescriptionExists = await page.$('[data-automation-id="description"]');
    if (formData.roleDescription === "") {
        console.log('no Role description input skip it');
    } else
        if (roleDescriptionExists) {
            console.log('Element with data-automation-id description" exists.');
            // Fills in the phone number text box 
            roleDescriptionExists.type(formData.roleDescription);
            await page.waitForTimeout(1000);
        } else {
            console.log('Element with data-automation-id-prompt="description" does not exist.');
        }
}

async function school(page, formData) {
    // await page.waitForSelector('[data-automation-id="school"]');
    const schoolTextExists = await page.$('[data-automation-id="school"]');
    if (formData.school === "") {
        console.log('no school input skip it');
    } else
        if (schoolTextExists) {
            console.log('Element with data-automation-id school" exists.');
            // Fills in the phone number text box 
            schoolTextExists.type(formData.school);
            await page.waitForTimeout(500);
        } else {
            console.log('Element with data-automation-id-prompt="school" does not exist.');
        }
}

async function fieldOfStudy(page, formData) {
    // await page.waitForSelector('[data-automation-id="formField-field-of-study"]');
    const studyExists = await page.$('[data-automation-id="formField-field-of-study"]');
    if (formData.fieldOfStudy === "") {
        console.log('no field of study input skip it');
    } else
        if (studyExists) {
            console.log('Element with data-automation-id-prompt="formField-field-of-study" exists.');
            // Click the button to open the dropdown
            studyExists.click('[data-automation-id="formField-field-of-study"]')
            // Types in United states of america and presses enter
            await page.waitForTimeout(500);
            studyExists.type(formData.fieldOfStudy);
            await page.keyboard.press('Enter');
        } else {
            console.log('Element with data-automation-id-prompt="formField-field-of-study" does not exist.');
        }
}

async function degree(page, formData) {
    // await page.waitForSelector('[data-automation-id="degree"]');
    const degreeTypeExists = await page.$('[data-automation-id="degree"]');
    if (formData.degree === "") {
        console.log('no degree input skip it');
    } else
        if (degreeTypeExists) {
            await page.$eval('[data-automation-id="degree"]', form => form.click());
            // Wait for the popup to appear
            await page.waitForSelector('.wd-popup', { visible: true, timeout: 5000 });
            // Check if the popup is visible
            const isPopupVisible = await page.evaluate(() => {
                const popup = document.querySelector('.wd-popup');
                return popup !== null && window.getComputedStyle(popup).display !== 'none';
            });
            if (isPopupVisible) {
                console.log('Popup is showing.');
                await page.waitForTimeout(500);
                // Click on the element with text "Bachelors"
                await page.waitForXPath(`//div[text()="${formData.degree}"]`);
                const element = await page.$x(`//div[text()="${formData.degree}"]`);
                await element[0].click();
                console.log('Clicked on Bachelors');
            } else {
                console.log('Popup is not showing.');
            }
        } else {
            console.log('Element with data-automation-id-prompt="formField-degree" does not exist.');
        }
}

app.post('/submit-workday', async (req, res) => {
    try {
        const formData = req.body;
        await automateApplication(formData);
        res.status(200).send({ message: 'Starting to fill appl' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

async function automateApplication(formData) {
    const page = await initBrowser(formData);

    // Your automation code here using formData
    await sourceFind(page, formData);
    await prevEmployed(page, formData);
    await countryFrom(page, formData);
    await firstName(page, formData);
    await lastName(page, formData);
    await addy1(page, formData);
    await addy2(page, formData);
    await addressCity(page, formData);
    await addressState(page, formData);
    await addressPostalCode(page, formData);
    await addressCounty(page, formData);
    await emailFunction(page, formData);
    await countryPhoneCode(page, formData);
    await phoneNumber(page, formData);
    await phoneDeviceType(page, formData);
    await sourceFind(page, formData);
    await nextButtonClick(page);
    await jobTitle(page, formData)
    await companyTitle(page, formData)
    await jobLocation(page, formData)
    await startYearMonth(page, formData)
    await endYearMonth(page, formData)
    await roleDescription(page, formData);
    await school(page, formData);
    await fieldOfStudy(page, formData);
    await degree(page, formData);

    // await browser.close();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
