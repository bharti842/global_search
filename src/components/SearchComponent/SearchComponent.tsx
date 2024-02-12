import React, { useState } from 'react';
import ClayTable from '@clayui/table';
import ClayButton from "@clayui/button";
import { ISearchResult, IFormData } from '../../utils/interfaces/searchresults.interface';
import { mockData } from '../../utils/mockdata/MockTableData';
import { SEARCH_LABELS } from '../../utils/constants/searchConstants';
import CommonInput from '../CommonInput/CommonInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  pincode: Yup.number().required('Pincode is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const SearchComponent: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: undefined,
      email: '',
    },
    validationSchema,
    onSubmit: () => {
      handleSearch();
    },
  });

  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const handleClear = () => {
    formik.resetForm();
    setSearchResults([]);
  };

  const handleSearch = () => {
    const filteredResults = mockData.filter((data) => {
      return Object.keys(formik.values).every((key) => {
        const searchValue = formik.values[key as keyof IFormData];
        const dataValue = data[key as keyof IFormData];

        if (key === 'pincode') {
          return searchValue !== undefined ? dataValue === searchValue : true;
        }

        // Handling case where the value is a string or number separately
        const stringSearchValue = String(searchValue)?.toLowerCase();
        const dataStringValue = String(dataValue)?.toLowerCase();

        return dataStringValue?.includes(stringSearchValue);
      });
    });

    setSearchResults(filteredResults);
  };

  return (
    <div>
      {/* Input Fields */}
      <form onSubmit={formik.handleSubmit}>
        <CommonInput
          label={SEARCH_LABELS.COMPANY_NAME}
          value={formik.values.companyName}
          onChange={formik.handleChange('companyName')}
          error={formik.touched.companyName && formik.errors.companyName}
        />
        <CommonInput
          label={SEARCH_LABELS.ADDRESS}
          value={formik.values.address}
          onChange={formik.handleChange('address')}
          error={formik.touched.address && formik.errors.address}
        />
        <CommonInput
          label={SEARCH_LABELS.CITY}
          value={formik.values.city}
          onChange={formik.handleChange('city')}
          error={formik.touched.city && formik.errors.city}
        />
        <CommonInput
          label={SEARCH_LABELS.STATE}
          value={formik.values.state}
          onChange={formik.handleChange('state')}
          error={formik.touched.state && formik.errors.state}
        />
        <CommonInput
          label={SEARCH_LABELS.COUNTRY}
          value={formik.values.country}
          onChange={formik.handleChange('country')}
          error={formik.touched.country && formik.errors.country}
        />
        <CommonInput
          label={SEARCH_LABELS.PINCODE}
          value={formik.values.pincode}
          onChange={formik.handleChange('pincode')}
          error={formik.touched.pincode && formik.errors.pincode}
        />
        <CommonInput
          label={SEARCH_LABELS.CONTACT_EMAIL}
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          error={formik.touched.email && formik.errors.email}
        />

        {/* Buttons */}
        <ClayButton type="submit">Search</ClayButton>
        <ClayButton type="button" onClick={handleClear}>
          Clear
        </ClayButton>
      </form>

      {/* Table result */}
      <ClayTable>
        <ClayTable.Head>
          <ClayTable.Row>
            <ClayTable.Cell>{SEARCH_LABELS.COMPANY_NAME}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.ADDRESS}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.CITY}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.STATE}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.COUNTRY}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.PINCODE}</ClayTable.Cell>
            <ClayTable.Cell>{SEARCH_LABELS.CONTACT_EMAIL}</ClayTable.Cell>
          </ClayTable.Row>
        </ClayTable.Head>
        <ClayTable.Body>
          {searchResults?.length === 0 && <p>No results to display</p>}
          {searchResults?.map((result, index) => (
            <ClayTable.Row key={index}>
              <ClayTable.Cell>{result.companyName}</ClayTable.Cell>
              <ClayTable.Cell>{result.address}</ClayTable.Cell>
              <ClayTable.Cell>{result.city}</ClayTable.Cell>
              <ClayTable.Cell>{result.state}</ClayTable.Cell>
              <ClayTable.Cell>{result.country}</ClayTable.Cell>
              <ClayTable.Cell>{result.pincode}</ClayTable.Cell>
              <ClayTable.Cell>{result.email}</ClayTable.Cell>
            </ClayTable.Row>
          ))}
        </ClayTable.Body>
      </ClayTable>
    </div>
  );
};

export default SearchComponent;
